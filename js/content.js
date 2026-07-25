// Renders The Houses journal and the freebies grid from their JSON files.
// To update either section: edit the JSON, drop in the image/PDF, push. That's it.

function renderList(url, targetId, template) {
  fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (items) {
      var el = document.getElementById(targetId);
      if (!el) return;
      el.innerHTML = items.map(template).join('');
    })
    .catch(function (err) { console.error('Could not load ' + url, err); });
}

// The Houses — a journal, not a listings grid.
// Each entry has a "type" label (Sold & Sent Off / Walked This Week / A Neighborhood / In Their Words)
// so sold homes sit next to previews and neighborhood pieces — mixing entry types
// is what keeps this from reading as "just two transactions."
renderList('data/sales.json', 'stories', function (s) {
  if (s.type === 'In Their Words') {
    return (
      '<div class="story entry-quote">' +
        '<div class="story-body">' +
          '<span class="story-type">' + s.type + '</span>' +
          '<div class="pull-quote">&ldquo;' + s.story + '&rdquo;</div>' +
          '<p style="margin-top:1rem;">' + s.title + '</p>' +
        '</div>' +
      '</div>'
    );
  }
  return (
    '<div class="story' + (s.image ? '' : ' no-image') + '">' +
      (s.image ? '<img src="images/' + s.image + '" alt="' + s.title + '">' : '') +
      '<div class="story-body">' +
        '<span class="story-type">' + s.type + '</span>' +
        '<h3>' + s.title + '</h3>' +
        '<p>' + s.story + '</p>' +
        (s.pullQuote ? '<div class="pull-quote">' + s.pullQuote + '</div>' : '') +
      '</div>' +
    '</div>'
  );
});

// Freebies
renderList('freebies/freebies.json', 'freebies-grid', function (f) {
  return (
    '<div class="freebie-card">' +
      '<img src="freebies/' + f.thumbnail + '" alt="' + f.title + '">' +
      '<div class="freebie-card-body">' +
        '<h3>' + f.title + '</h3>' +
        '<p>' + f.description + '</p>' +
        '<a class="freebie-download" href="freebies/' + f.file + '" download>Download &rarr;</a>' +
      '</div>' +
    '</div>'
  );
});
