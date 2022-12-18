const ApiResponse = require('../../../utils/apiResponse');
const { PropertyModel } = require('../../models');

async function getFilters() {
  const [filters] = await PropertyModel.aggregate([
    {
      $group: {
        _id: null,
        localities: {
          $addToSet: '$address.district',
        },
        categories: {
          $addToSet: '$listingType',
        },
      },
    },
  ]);
  return ApiResponse('SUCCESS', filters);
}

module.exports = getFilters;
