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

async function find({
  search,
  page = 0,
  area,
  listingType,
  bedrooms,
  propertyFor,
}) {
  const q = buildListingFilterFromQuery({
    search,
    listingType,
    bedrooms,
    area,
    propertyFor,
  });

  const [listings, total] = await Promise.all([
    PropertyModel.find(q)
      .skip(page * 14)
      .limit(14)
      .lean(),
    PropertyModel.countDocuments(q),
  ]);
  return ApiResponse('SUCCESS', {
    listings,
    total,
  });
}

module.exports = { find, findBySlug };
