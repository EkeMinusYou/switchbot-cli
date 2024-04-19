// See: https://github.com/OpenWonderLabs/SwitchBotAPI?tab=readme-ov-file#errors
export const newErrorResponse = (
  code: number,
  message: string,
  body: unknown,
): Error | void => {
  if (code < 200 || code >= 300) {
    return new Error(`unexpected status code: ${code}, ${message}`);
  }
  if (
    !body || typeof body !== "object" || !("statusCode" in body) ||
    !("message" in body)
  ) {
    return new Error("invalid response body");
  }

  switch (body.statusCode) {
    case 100:
      return;
    default:
      return new Error(
        `unexpected status code: ${body.statusCode}, message: ${body.message}`,
      );
  }
};
