import axios from "axios";
import cheerio from "cheerio";
import devConfigs from "../config/dev-config.js";

export const getFlavorOfMonth = async (req, res, next) => {
  const monthlyFlavorSelector = "h2[class=woocommerce-loop-product__title]";
  let flavor;
  try {
    flavor = await axios(devConfigs.flavorURL)
      .then((res) => {
        //get page scrape
        const data = res.data;
        const $ = cheerio.load(data);
        //select relevant element
        const flavorHeader = $(monthlyFlavorSelector).html();
        //clean for only relevant data
        //assuming text is 'Flavor - Flavor Name'
        const flavor = flavorHeader
          .substring(flavorHeader.indexOf("–") + 1)
          .trim();
        return flavor;
      })
      .catch((error) => {
        throw error;
      });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }

  if (!flavor) {
    return res
      .status(404)
      .json({ message: "No flavor data. Check back later." });
  }

  return res.status(200).json({ flavor });
};
