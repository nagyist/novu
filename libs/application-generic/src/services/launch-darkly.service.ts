import {
  init,
  LDClient,
  LDMultiKindContext,
  LDSingleKindContext,
} from 'launchdarkly-node-server-sdk';
import { Injectable, Logger } from '@nestjs/common';

import {
  EnvironmentId,
  FeatureFlagContext,
  FeatureFlagsKeysEnum,
  IFeatureFlagsService,
  OrganizationId,
  UserId,
} from './types';

const LOG_CONTEXT = 'LaunchDarklyService';

@Injectable()
export class LaunchDarklyService implements IFeatureFlagsService {
  private client: LDClient;
  public isEnabled: boolean;

  public async initialize(): Promise<void> {
    Logger.log('Launch Darkly service initialized', LOG_CONTEXT);
    const launchDarklySdkKey = process.env.LAUNCH_DARKLY_SDK_KEY;

    if (launchDarklySdkKey) {
      this.client = init(launchDarklySdkKey);
      this.isEnabled = true;
      await this.clientInitialization();
    } else {
      Logger.log(
        'Missing Launch Darkly SDK key. Launch Darkly is not initialized',
        LOG_CONTEXT,
      );
      this.isEnabled = false;
    }
  }

  private async clientInitialization(): Promise<void> {
    try {
      await this.client.waitForInitialization();
      Logger.log(
        'Launch Darkly SDK has been successfully initialized',
        LOG_CONTEXT,
      );
    } catch (error) {
      Logger.error(
        error,
        'Launch Darkly SDK has failed when initialized',
        LOG_CONTEXT,
      );
      throw error;
    }
  }

  private async get<T>(
    key: FeatureFlagsKeysEnum,
    context: LDSingleKindContext,
    defaultValue: T,
  ): Promise<T> {
    return await this.client.variation(key, context, defaultValue);
  }

  public async getWithAnonymousContext<T>(
    key: FeatureFlagsKeysEnum,
    defaultValue: T,
  ): Promise<T> {
    const anonymousUserContext = {
      key,
      kind: 'user',
      anonymous: true,
    };

    const result = await this.get(key, anonymousUserContext, defaultValue);

    return result;
  }

  /**
   * @deprecated This method is deprecated.
   * Please use the more flexible `getFlag()` method instead, with the context data.
   */
  public async getWithEnvironmentContext<T>(
    key: FeatureFlagsKeysEnum,
    defaultValue: T,
    environmentId: EnvironmentId,
  ): Promise<T> {
    const context = this.mapToEnvironmentContext(environmentId);

    return await this.get(key, context, defaultValue);
  }

  /**
   * @deprecated This method is deprecated.
   * Please use the more flexible `getFlag()` method instead, with the context data.
   */
  public async getWithOrganizationContext<T>(
    key: FeatureFlagsKeysEnum,
    defaultValue: T,
    organizationId: OrganizationId,
  ): Promise<T> {
    const context = this.mapToOrganizationContext(organizationId);

    return await this.get(key, context, defaultValue);
  }

  /**
   * @deprecated This method is deprecated.
   * Please use the more flexible `getFlag()` method instead, with the context data.
   */
  public async getWithUserContext<T>(
    key: FeatureFlagsKeysEnum,
    defaultValue: T,
    userId: UserId,
  ): Promise<T> {
    const context = this.mapToUserContext(userId);

    return await this.get(key, context, defaultValue);
  }

  public async getFlag<T>({
    key,
    defaultValue,
    environment,
    organization,
    user,
    anonymous,
  }: FeatureFlagContext<T>): Promise<T> {
    const mappedContext: LDMultiKindContext = {
      kind: 'multi',
    };

    if (environment) {
      mappedContext.environment = {
        ...environment,
        key: environment._id,
      };
    }

    if (organization) {
      mappedContext.organization = {
        ...organization,
        key: organization._id,
      };
    }

    if (user) {
      mappedContext.user = {
        ...user,
        key: user._id,
      };
    }

    return await this.client.variation(key, mappedContext, defaultValue);
  }

  public async gracefullyShutdown(): Promise<void> {
    if (this.client) {
      try {
        await this.client.flush();
        await this.client.close();
        Logger.log(
          'Launch Darkly SDK has been gracefully shut down',
          LOG_CONTEXT,
        );
      } catch (error) {
        Logger.error(
          error,
          'Launch Darkly SDK has failed when shut down',
          LOG_CONTEXT,
        );
        throw error;
      }
    }
  }

  private mapToEnvironmentContext(
    environmentId: EnvironmentId,
  ): LDSingleKindContext {
    const launchDarklyContext = {
      kind: 'environment',
      key: environmentId,
    };

    return launchDarklyContext;
  }

  private mapToOrganizationContext(
    organizationId: OrganizationId,
  ): LDSingleKindContext {
    const launchDarklyContext = {
      kind: 'organization',
      key: organizationId,
    };

    return launchDarklyContext;
  }

  private mapToUserContext(userId: UserId): LDSingleKindContext {
    const launchDarklyContext = {
      kind: 'user',
      key: userId,
    };

    return launchDarklyContext;
  }
}
