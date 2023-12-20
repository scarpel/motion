import ResponseError from "@src/errors/ResponseError";

export async function handleFetchRequest(
  request: Promise<Response>,
  errorMessage: string = "Unable to complete request"
) {
  const res = await request;

  const body = await res.json().catch(() => null);

  if (!res.ok) throw new ResponseError(errorMessage, res.status, body);

  return body;
}
