const { pageFromTotal } = require('../../utils/pagesFromTotal');
const ApiResponse = require('../../../utils/apiResponse');
const buildListingFilterFromQuery = require('../utils/buildFilters');
const { PropertyModel } = require('../../models');

async function findBySlug({ slug }) {
  const listing = await PropertyModel.findOneAndUpdate(
    {
      slug,
    },
    {
      $inc: {
        views: 1,
      },
    },
    {
      new: true,
    },
  );
  return ApiResponse('SUCCESS', listing);
}

async function find({ search, page = 0, area, listingType, bedrooms }) {
  const q = buildListingFilterFromQuery({
    search,
    listingType,
    bedrooms,
    area,
  });
  const [listings, totalDocs] = await Promise.all([
    PropertyModel.find(q)
      .skip(page * 14)
      .limit(14)
      .lean(),
    PropertyModel.countDocuments(q),
  ]);
  const pages = pageFromTotal(totalDocs, 14);
  return ApiResponse('SUCCESS', {
    listings,
    pages,
  });
}

module.exports = { find, findBySlug };
