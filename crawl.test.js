const {test, expect, toBe } = require('@jest/globals')
const {normalizeUrl, getURLsFromHTML} = require('./crawl.js')

test('normalize https url with trailing backslash', () =>{
    expect(normalizeUrl('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
});
test('normalize https url', () =>{
    expect(normalizeUrl('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
});
test('normalize http url with trailing backslash', () =>{
    expect(normalizeUrl('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
});
test('normalize http url', () =>{
    expect(normalizeUrl('http://blog.boot.dev/path')).toBe('blog.boot.dev/path')
});

test('getURLsFromHTML absolute', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML relative', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one']
    expect(actual).toEqual(expected)
  })
   
  test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML handle error', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ ]
    expect(actual).toEqual(expected)
  })