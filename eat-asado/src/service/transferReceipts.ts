import { ITransferReceiptRequest, ITransferReceiptImage } from '../models/transfer';
import { _delete, _get, _post, _put, _postFiles } from './httpService';

export async function createTransferReceipt(idEvent: string, payload: ITransferReceiptRequest, signal?: AbortSignal): Promise<any> {
	//TODO: tipar any
	const url = `/transferReceipts/createTransferReceipt/${idEvent}`;
	return await _post<any, ITransferReceiptRequest>(url, payload, signal);
}

export async function uploadFile(formFile: ITransferReceiptImage, idPurchaseReceipt: string, signal?: AbortSignal): Promise<any> {
	//TODO: tipar any
	const url = `/transferReceipts/uploadFile/${idPurchaseReceipt}`;
	return await _postFiles(formFile, url, signal);
}

export async function approveTransferReceipts(idTransferReceipt: string | undefined, idEvent: string, signal?: AbortSignal): Promise<any> {
	//TODO: tipar any
	const url = `/transferReceipts/approveTransferReceipt/${idTransferReceipt}/${idEvent}`;
	return await _put<any>(url, signal);
}

export async function deleteTransferReceipt(idTransferReceipt: string | undefined, signal?: AbortSignal): Promise<any> {
	//TODO: tipar any
	const url = `/transferReceipts/deleteTransferReceipt/${idTransferReceipt}`;
	return await _delete<any>(url, signal);
}

export async function getTransferReceipt(idTransferReceipt?: string, signal?: AbortSignal): Promise<any> {
	//TODO: tipar any
	const url = `/transferReceipts/getTransferReceiptsById/${idTransferReceipt}`;
	return await _get(url, signal);
}

export async function approvePaymentWithoutReceipt(idUser: string, idEvent: string, signal?: AbortSignal): Promise<any> {
	//TODO: tipar any
	const url = `/transferReceipts/approvePaymentWithoutReceipt/${idEvent}/${idUser}`;
	return await _post<any>(url, signal);
}
