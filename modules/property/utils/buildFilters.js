function buildListingFilterFromQuery(query) {
  const mongoQuery = {};

  if (query.propertyFor) {
    mongoQuery['billing.propertyFor'] = query.propertyFor;
  }

  if (query.search) {
    mongoQuery.$text = {
      $search: query.search,
    };
  }

  if (query.listingType) {
    mongoQuery.listingType = query.listingType.toLowerCase();
  }

  if (query.bedrooms) mongoQuery.bedrooms = Number(query.bedrooms);

  if (query.area) {
    mongoQuery.$or = [
      {
        'placeInfo.area': {
          $gte: Number(query.area),
        },
      },
      {
        'placeInfo.area': 0,
      },
    ];
  }

  console.log('query generated', { query, mongoQuery });

  return mongoQuery;
}

module.exports = buildListingFilterFromQuery;
