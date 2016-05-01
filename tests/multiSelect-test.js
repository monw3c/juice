const MultiSelect = require('../src/MultiSelect/index.js');

describe('multiSelect functionality', () => {
  let categories;

  beforeEach(() => {
    $('body').append('<div class="multiSelect-test"></div>');
    categories = new MultiSelect('.multiSelect-test', {
      options: [{
        displayName: 'Marketing',
        value: 'mrkt01',
        count: 5
      }, {
        displayName: 'Sales',
        value: 'sales',
        count: 9
      }, {
        displayName: 'Engineering',
        value: 'eng-2015',
        count: 43
      }],
      renderItem(item) {
        return item.displayName + ' (' + item.count + ')';
      }
    });

    categories.render();
  });

  afterEach(() => {
    $('body').empty();
  });

  it('should have all checkboxes initially unchecked', () => {
    expect(Array.isArray(categories.get())).toBe(true);
    expect(categories.get().length).toBe(0);
  });

  it('should be able to check an option programatically', () => {
    categories.set(['mrkt01', 'sales']);
    let selected = categories.get();
    expect(selected.length).toBe(2);
    expect(selected[0].value).toBe('mrkt01');
    expect(selected[1].value).toBe('sales');
  });

  it('should click a single checkbox span and set the value', () => {
    const elementToClick = $($('.ms-label')[0]).find('span');
    elementToClick.trigger('click');
    let selected = categories.get();
    expect(selected.length).toBe(1);
    expect(selected[0].value).toBe('mrkt01');
  });

  it('should click a single checkbox directly and set the value', () => {
    const elementToClick = $($('.ms-label')[1]).find('input');
    elementToClick.trigger('click');
    setTimeout(() => {
      let selected = categories.get();
      expect(selected.length).toBe(1);
      expect(selected.value).toBe('sales');
    }, 100);
  });

  it('should click multiple checkbox labels and set the value', () => {
    // click the first element
    const elementToClick = $($('.ms-label')[0]).find('span');
    elementToClick.trigger('click');
    let selected = categories.get();
    expect(selected.length).toBe(1);
    expect(selected[0].value).toBe('mrkt01');

    // click the second element
    const elementToClick2 = $($('.ms-label')[1]).find('span');
    elementToClick2.trigger('click');
    selected = categories.get();
    expect(selected.length).toBe(2);
    expect(selected[0].value).toBe('mrkt01');
    expect(selected[1].value).toBe('sales');

    // click the first element again, de-selecting it
    elementToClick.trigger('click');
    selected = categories.get();
    expect(selected.length).toBe(1);
    expect(selected[0].value).toBe('sales');
  });

  it('should click multiple checkboxes directly and set the value', () => {
    const elementToClick = $($('.ms-label')[2]).find('input');
    const elementToClick2 = $($('.ms-label')[0]).find('input');

    elementToClick.trigger('click');

    setTimeout(() => {
      let selected = categories.get();
      expect(selected.length).toBe(1);
      expect(selected[0].value).toBe('eng-2015');

      // click the second element
      elementToClick2.trigger('click');

      setTimeout(() => {
        selected = categories.get();
        expect(selected.length).toBe(2);
        expect(selected[0].value).toBe('eng-2015');
        expect(selected[1].value).toBe('mrkt01');

        // click the second element again, de-selecting it
        elementToClick2.trigger('click');

        setTimeout(() => {
          selected = categories.get();
          expect(selected.length).toBe(1);
          expect(selected[0].value).toBe('eng-2015');
        },50);
      }, 50);     
    }, 50); 
  });
});
