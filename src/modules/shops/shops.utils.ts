import slugify from 'slugify';
import { getRandomInt } from 'src/shared/utils/math.utils';

export const getShopSlug = (shopName: string) => {
  return slugify(`${shopName.toLowerCase()} ${getRandomInt()}`, '-');
};
