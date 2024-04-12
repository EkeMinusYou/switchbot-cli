// See: https://github.com/OpenWonderLabs/SwitchBotAPI?tab=readme-ov-file#errors
export const newErrorResponse = (response: unknown): Error | void => {
  if (
    !response || typeof response !== "object" || !("statusCode" in response) ||
    !("message" in response)
  ) {
    return new Error("invalid response");
  }

  switch (response.statusCode) {
    case 100:
      return;
    default:
      return new Error(
        `unexpected status code: ${response.statusCode}, message: ${response.message}`,
      );
  }
};
