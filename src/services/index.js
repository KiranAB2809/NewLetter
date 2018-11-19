import * as _api from './api.service';
import { base64ToBlob } from './conversion.service';

export const api = _api;
export const imgConv = base64ToBlob;