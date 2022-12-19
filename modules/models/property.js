/* eslint-disable */
const { Schema } = require('mongoose');
const { connectedDbs } = require('../../utils/database');
const { convert } = require('url-slug');
const { nanoid } = require('nanoid');

/** @type import('mongoose'); */
const househunt = connectedDbs.househunt;

const EnumType = {
  type: String,
  enum: ['YES', 'NO', 'NA'],
};

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  available: Boolean,
  description: {
    type: String,
    required: true,
  },
  listingType: {
    type: String,
    enum: [
      'apartment',
      'room_in_apartment',
      'daily_rent',
      'hostel',
      'office_space',
      'godown',
      'shop',
    ],
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  contacts: [String],
  address: {
    building: {
      type: String,
      required: true,
    },
    road: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      default: '-',
      required: true,
    },
    city: {
      type: String,
      required: true,

      default: 'Malé',
    },
  },
  placeDescription: [
    new Schema(
      {
        label: String,
        value: String,
      },
      { _id: false },
    ),
  ],
  placeInfo: {
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    balcony: EnumType,
    frontDoorSecurity: EnumType,
    securityCameras: EnumType,
    lift: EnumType,
    freeWifi: EnumType,
    freeTv: EnumType,
    accmodationFor: {
      type: String,
      enum: ['girls', 'boys', 'any'],
      default: 'any',
    },
    idealTenants: {
      type: String,
      default: 'Any',
    },
    furnishing: {
      type: String,
      enum: ['Not Furnished', 'Semi-Furnished', 'Fully Furnished', '-'],
    },
  },
  images: [
    new Schema(
      {
        url: String,
        name: String,
        path: String,
        size: String,
        type: { type: String },
      },
      { _id: false },
    ),
  ],
  billing: new Schema(
    {
      rate: { type: Number },
      propertyFor: {
        type: String,
        enum: ['sell', 'rent'],
      },
      per: {
        type: String,
        enum: ['sqft', 'sqyd', 'sqmtr'],
      },
      rent: { type: Number },
      rentPeriod: {
        type: String,
        enum: ['day', 'month', 'year'],
        default: 'month',
      },
      advance: {
        type: Number,
        default: 0,
        required: true,
      },
      otherCharges: [
        new Schema(
          {
            label: String,
            value: Number,
          },
          { timestamps: false, _id: false },
        ),
      ],
      bills: new Schema(
        {
          water: {
            type: String,
            enum: ['included', 'separate'],
            default: 'separate',
          },
          electricity: {
            type: String,
            enum: ['included', 'separate'],
            default: 'separate',
          },
        },
        { _id: false },
      ),
    },
    { _id: false },
  ),
  slug: {
    type: String,
  },
  searchText: String,
  views: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

function getSlug(doc) {
  const type = doc.listingType;
  switch (type) {
    case 'apartment':
      return `${doc.placeInfo.bedrooms} room apartment near ${doc.address.district}`;
    case 'room_in_apartment':
      return `${doc.placeInfo.bedrooms} room from ${doc.placeInfo.masterApartmentRooms} room apartment for rent near ${doc.address.district}`;
    case 'daily_rent':
      return `Daily room for rent for ${doc.billing.rent}`;
    case 'hostel': {
      let str = `Accomodation for ${doc.placeInfo.accmodationFor}`;
      if (doc.placeInfo.freeWifi) {
        str += ' with free wifi';
      }
      if (doc.placeInfo.freeTv && doc.placeInfo.freeWifi) {
        str += 'and';
      }
      if (doc.placeInfo.freeTv) {
        str += ' with free tv';
      }
      return str;
    }
    case 'office_space':
      return `Office space for lease`;
    case 'godown':
      return `Godown for rent in ${doc.address.district} near ${doc.address.road}`;
    case 'shop':
      return `Shop for rent in ${doc.address.district} near ${doc.address.road}`;
    default:
      return '';
  }
}

function preValidate(next, data) {
  if (!this.slug) {
    this.slug = convert(`${getSlug(this)}-${nanoid()}`);
  }
  if (this.placeDescription.length === 0) {
    this.placeDescription = [
      'bedrooms',
      'bathrooms',
      'area',
      'balcony',
      'frontDoorSecurity',
      'securityCameras',
      'lift',
      'freeWifi',
      'freeTv',
      'idealTenants',
      // 'accomodationFor',
      'furnishing',
    ].map((key) => ({
      label: listingUtils.getPlaceDescLabel(key),
      value: doc.placeInfo[key] || '-',
    }));
  }

  if (this.contacts.length === 0 && this.contact) {
    this.contacts.push(this.contact);
  }

  next();
}

schema.pre('validate', preValidate);

schema.index({
  description: 'text',
  title: 'text',
  slug: 'text',
});

/** @type {import('mongoose').Model<any, any>} */
module.exports = househunt.model('Property', schema);
