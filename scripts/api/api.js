class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
    try {
      const response = await fetch(this._url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      return data; // Return the entire data object
    } catch (err) {
      console.error("An error occurred:", err);
      throw err; // You may choose to handle the error differently
    }
  }
}

class PhotographersApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getPhotographers() {
    return await this.get("res.photographers");
  }
}

export { PhotographersApi };
