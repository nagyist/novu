/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { subscribersCreate } from "../funcs/subscribersCreate.js";
import { subscribersCreateBulk } from "../funcs/subscribersCreateBulk.js";
import { subscribersDelete } from "../funcs/subscribersDelete.js";
import { subscribersList } from "../funcs/subscribersList.js";
import { subscribersPatch } from "../funcs/subscribersPatch.js";
import { subscribersRetrieve } from "../funcs/subscribersRetrieve.js";
import { subscribersSearch } from "../funcs/subscribersSearch.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as components from "../models/components/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
import { PageIterator, unwrapResultIterator } from "../types/operations.js";
import { Authentication } from "./authentication.js";
import { Credentials } from "./credentials.js";
import { NovuMessages } from "./novumessages.js";
import { NovuNotifications } from "./novunotifications.js";
import { Preferences } from "./preferences.js";
import { Properties } from "./properties.js";

export class Subscribers extends ClientSDK {
  private _credentials?: Credentials;
  get credentials(): Credentials {
    return (this._credentials ??= new Credentials(this._options));
  }

  private _properties?: Properties;
  get properties(): Properties {
    return (this._properties ??= new Properties(this._options));
  }

  private _notifications?: NovuNotifications;
  get notifications(): NovuNotifications {
    return (this._notifications ??= new NovuNotifications(this._options));
  }

  private _messages?: NovuMessages;
  get messages(): NovuMessages {
    return (this._messages ??= new NovuMessages(this._options));
  }

  private _authentication?: Authentication;
  get authentication(): Authentication {
    return (this._authentication ??= new Authentication(this._options));
  }

  private _preferences?: Preferences;
  get preferences(): Preferences {
    return (this._preferences ??= new Preferences(this._options));
  }

  /**
   * Get subscribers
   *
   * @remarks
   * Returns a list of subscribers, could paginated using the `page` and `limit` query parameter
   */
  async list(
    page?: number | undefined,
    limit?: number | undefined,
    idempotencyKey?: string | undefined,
    options?: RequestOptions,
  ): Promise<
    PageIterator<
      operations.SubscribersV1ControllerListSubscribersResponse,
      { page: number }
    >
  > {
    return unwrapResultIterator(subscribersList(
      this,
      page,
      limit,
      idempotencyKey,
      options,
    ));
  }

  /**
   * Bulk create subscribers
   *
   * @remarks
   *
   *       Using this endpoint you can create multiple subscribers at once, to avoid multiple calls to the API.
   *       The bulk API is limited to 500 subscribers per request.
   */
  async createBulk(
    bulkSubscriberCreateDto: components.BulkSubscriberCreateDto,
    idempotencyKey?: string | undefined,
    options?: RequestOptions,
  ): Promise<operations.SubscribersV1ControllerBulkCreateSubscribersResponse> {
    return unwrapAsync(subscribersCreateBulk(
      this,
      bulkSubscriberCreateDto,
      idempotencyKey,
      options,
    ));
  }

  /**
   * Search for subscribers
   */
  async search(
    request: operations.SubscribersControllerSearchSubscribersRequest,
    options?: RequestOptions,
  ): Promise<operations.SubscribersControllerSearchSubscribersResponse> {
    return unwrapAsync(subscribersSearch(
      this,
      request,
      options,
    ));
  }

  /**
   * Create subscriber
   *
   * @remarks
   * Create subscriber with the given data
   */
  async create(
    createSubscriberRequestDto: components.CreateSubscriberRequestDto,
    idempotencyKey?: string | undefined,
    options?: RequestOptions,
  ): Promise<operations.SubscribersControllerCreateSubscriberResponse> {
    return unwrapAsync(subscribersCreate(
      this,
      createSubscriberRequestDto,
      idempotencyKey,
      options,
    ));
  }

  /**
   * Get subscriber
   *
   * @remarks
   * Get subscriber by your internal id used to identify the subscriber
   */
  async retrieve(
    subscriberId: string,
    idempotencyKey?: string | undefined,
    options?: RequestOptions,
  ): Promise<operations.SubscribersControllerGetSubscriberResponse> {
    return unwrapAsync(subscribersRetrieve(
      this,
      subscriberId,
      idempotencyKey,
      options,
    ));
  }

  /**
   * Patch subscriber
   *
   * @remarks
   * Patch subscriber by your internal id used to identify the subscriber
   */
  async patch(
    patchSubscriberRequestDto: components.PatchSubscriberRequestDto,
    subscriberId: string,
    idempotencyKey?: string | undefined,
    options?: RequestOptions,
  ): Promise<operations.SubscribersControllerPatchSubscriberResponse> {
    return unwrapAsync(subscribersPatch(
      this,
      patchSubscriberRequestDto,
      subscriberId,
      idempotencyKey,
      options,
    ));
  }

  /**
   * Delete subscriber
   *
   * @remarks
   * Deletes a subscriber entity from the Novu platform
   */
  async delete(
    subscriberId: string,
    idempotencyKey?: string | undefined,
    options?: RequestOptions,
  ): Promise<operations.SubscribersControllerRemoveSubscriberResponse> {
    return unwrapAsync(subscribersDelete(
      this,
      subscriberId,
      idempotencyKey,
      options,
    ));
  }
}
