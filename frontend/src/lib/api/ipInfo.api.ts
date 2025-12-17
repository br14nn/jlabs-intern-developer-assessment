import { ipInfoAPI } from "../axios";

export async function getIPInfo(ip?: string): Promise<IResponse> {
  try {
    const url = ip ? `/${ip}/geo` : "/geo";

    const { data } = await ipInfoAPI.get(url);

    return {
      results: data,
      error: false,
      message: "Get IP info successfully",
    };
  } catch (error: any) {
    if (error.response) {
      return {
        results: null,
        error: error.response.data,
        message: "Failed ot get IP info",
      };
    } else if (error.request) {
      return {
        results: null,
        error: error.request,
        message: "Request failed",
      };
    }

    return {
      results: null,
      error,
      message: error.message,
    };
  }
}
