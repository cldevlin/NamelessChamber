import { newPSet } from './models';

function railsFetch(url, options) {
  const token = $('meta[name="csrf-token"]').attr('content');
  options = _.merge({
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': token,
      'Content-Type': 'application/json'
    }
  }, options);

  let { queryParams } = options;

  if (_.isObject(queryParams)) {
    _.unset(options.queryParams);
    queryParams = _.map((v, k, i) => {
      v = encodeURIComponent(v);
      return `${k}=${v}`;
    }).join('&');

    if (url.indexOf('?') > -1) {
      url = `${url}&${queryParams}`;
    } else {
      url = `${url}?${queryParams}`;
    }
  }

  if (_.isObject(options.body)) {
    options.body = JSON.stringify(options.body);
  }

  return fetch(url, options);
}

export function fetchPSet(id, admin) {
  const prefix = admin ? '/admin' : '';
  const url = `${prefix}/p_sets/${id}.json`;
  return railsFetch(url, {method: 'GET'}).then((data) => {
    return data.json().then((pSet) => {
      if (admin && _.isEmpty(pSet.data)) {
        pSet.data = newPSet();
      }

      return pSet;
    });
  });
}

export function updatePSet(id, pSet, admin) {
  // boolify it
  const prefix = admin ? '/admin' : '';
  const url = `${prefix}/p_sets/${id}.json`;
  const data = {
    p_set: {
      name: pSet.name,
      data: pSet.data
    }
  };
  return railsFetch(url, {
    method: 'PUT',
    body: data
  }).then((data) => data.json());
}

export function fetchPSetAnswer(id) {
  const url = `/p_sets/${id}/answer.json`;
  return railsFetch(url, {method: 'GET'}).then((data) => {
    return data.json().then(({answer}) => answer);
  });
}

export function updatePSetAnswer(id, answer, submission, completed) {
  completed = completed || false;
  submission = submission || false;
  const url = `/p_sets/${id}/answer.json`;
  const data = {answer, completed, submission};
  return railsFetch(url, {
    method: 'PUT',
    body: data
  }).then((data) => data.json());
}

export function fetchPSetAnswerAdmin(id) {
  const url = `/admin/p_set_answers/${id}.json`;
  return railsFetch(url, {method: 'GET'}).then((data) => data.json());
}