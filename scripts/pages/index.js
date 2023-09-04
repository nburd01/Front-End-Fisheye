import { PhotographersApi } from "../api/api.js";
import { Photographer } from "../class/photographer.js";
import { PhotographerCard } from "../templates/photographer.js";

class Homepage {
  constructor() {
    // Get data
    this.photographersApi = new PhotographersApi("data/photographers.json");
    // Get element
    this.$photographersListWrapper =
      document.querySelector("#photographerList");
  }

  // Render photographer list
  async photographer() {
    const photographerData = await this.photographersApi.getPhotographers();
    console.log(photographerData.photographers);
    const photographersArray = photographerData.photographers;

    photographersArray
      .map((photographer) => new Photographer(photographer))
      .forEach((photographer) => {
        const template = new PhotographerCard(photographer);
        this.$photographersListWrapper.appendChild(
          template.createPhotographerCard()
        );
      });
  }
}

const homepage = new Homepage();
homepage.photographer();
