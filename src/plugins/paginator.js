import config from '../config/index.js';

/**
 * The response for paginated request of big ammounts of documents
 * @typedef Paginator
 * @type {object}
 * @param {boolean} hasNext Determine if next page is available
 * @param {boolean} hasPrev Determine if previous page is available
 * @param {number} page The current page is being requesting
 * @param {number} docsPerPage The number of docs per request
 * @param {number} totalDocs The total of documents available
 * @param {Document[]} data The payload requested
 * @param {string} next Link to get the next set of documents relative to the current page
 * @param {string} prev Link to get the previous set of documents relative to the current page
 */

/**
 * A plugin for mongoose to paginate the requested documents
 * @param {Query} query It the query that mongoose.Model.find() will use
 * @param {object} options The pagination options: limit, page, selection, sortby
 * @returns {Promise<Paginator>} The paginator object
 */
async function paginate(query = {}) {
  try {
    const { sortBy, page, limit, selection, populate, filters, ...rest } =
      query;
    const options = {
      sortBy,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      selection,
      populate,
      filters,
    };

    const defaultOptions = {
      limit: options.limit || 20,
      page: options.page || 1,
      selection: options.selection || '',
      sortBy: options.sortBy || '',
      populate: options.populate || '',
      filters: options.filters || '',
    };
    const totalDocs = await this.estimatedDocumentCount(rest);

    // putting boundaries to page requested by user. Can't exceed minimun and maximun
    const maxPage = Math.ceil(totalDocs / defaultOptions.limit);

    if (defaultOptions.page > maxPage || defaultOptions.page < 1) {
      throw new Error('pageOutOfRange', {
        cause: `Exceed page boundaries. page params should be between 1 to ${maxPage}. Got ${defaultOptions.page}`,
      });
    }

    //executing the query for the documents requested
    const docsQ = await this.find(rest)
      .select(defaultOptions.selection)
      .limit(defaultOptions.limit)
      .skip((defaultOptions.page - 1) * defaultOptions.limit)
      .sort(defaultOptions.sortBy)
      .populate(defaultOptions.populate)
      .where(defaultOptions.filters);
    //need to add filters somehow

    //this with help to next and prev links
    const url = config.baseURL;
    const endpoint = this.collection.name;

    const meta = {
      hasNext:
        Math.ceil(totalDocs / defaultOptions['limit']) - defaultOptions.page >
        0,
      hasPrev:
        Math.floor(totalDocs / defaultOptions['limit']) <=
          defaultOptions.page && defaultOptions.page > 1,
      page: defaultOptions.page,
      docsPerPage:
        defaultOptions.limit > totalDocs ? totalDocs : defaultOptions.limit,
      totalDocs,
      data: docsQ,
    };

    //if user sent a request with params it should repeat the params in every page
    let nextQuery = '';
    for (const opt in options) {
      if (!options[opt]) {
        continue;
      } else {
        try {
          let currentParam = options[opt].split(' ').join('%20');
          nextQuery += `&${opt}=${currentParam}`;
        } catch (e) {
          nextQuery += `&${opt}=${options[opt]}`;
        }
      }
    }
    //creating the links for next and previous page
    meta['next'] = meta.hasNext
      ? `${url}/${endpoint}?page=${meta.page + 1}${nextQuery}`
      : null;
    meta['prev'] = meta.hasPrev
      ? `${url}/${endpoint}?page=${meta.page - 1}${nextQuery}`
      : null;

    return meta;
  } catch (error) {
    throw new Error(error);
  }
}
/**
 * Should get a paginated plugin this time
 * @param {Schema} schema mongoose schema instance
 * @see sourceCodePath ./src/plugins/paginator.js
 */
const plugin = (schema) => {
  schema.static('paginate', paginate);
};

export default plugin;
