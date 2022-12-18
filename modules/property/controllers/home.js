const ApiResponse = require('../../../utils/apiResponse');
const { PropertyModel } = require('../../models');

async function homeData() {
  const [latest, featured] = await Promise.all([
    PropertyModel.find({
      'images.0': { $exists: true },
      listingType: 'apartment',
    })
      .sort({ _id: -1 })
      .limit(3)
      .lean(),
    PropertyModel.findOne({
      'images.0': { $exists: true },
      featured: true,
    })
      .sort({ _id: -1 })
      .lean(),
  ]);
  return ApiResponse('SUCCESS', { latest, featured });
}

async function getTrendingSearches() {
  const searches = [
    { title: '1 room apartment', url: '/listing?type=Apartment&rooms=1' },
    { title: '2 room apartment', url: '/listing?type=Apartment&rooms=2' },
    {
      title: '1 room apartment in Mumbai',
      url: '/listing?type=Apartment&rooms=1&search=mumbai',
    },
    { title: '1 room daily rent', url: '/listing?search=1+room+daily+rent' },
  ];
  return ApiResponse('SUCCESS', searches);
}

module.exports = { getTrendingSearches, homeData };
