# schema-normalizer
## Installation
`npm i @playma256/schema-normalizer --save-dev` or `yarn add @playma256/schema-normalizer -D`

## Motivations
Well, i needed a data normalizer, but a simple one which i could say which properties of something i needed and that would be exported.
So i searched the whole internet seeking for a simple solution, which i could not find.

In a nutshell, this is a normalizer/extracter in steroids.

## How to use it
Given an object, i.e, data.

```javascript
{
  prop1: [some array with strings],
  prop2: [{prop21: 'teste', prop22: 'teste2'}],
  prop4: {
    prop41: 'something',
    prop42: 'something2'
  }
}
```

We would like to extract just prop22 from prop2 and everything from prop4, but we would like to have a prop5, empty string, just for normalization purposes, so how do we do that?

First: we create a "pseudo" schema.

```
export default {
  prop2: ['prop22'],
  prop4: "*",
  prop5: ''
}
```

``` javascript
const normalizer = require('@playma256/schema-normalizer');

const data = {
  prop1: [some array with strings],
  prop2: [{prop21: 'teste', prop22: 'teste2'}],
  prop4: {
    prop41: 'something',
    prop42: 'something2'
  }
};

const finalData = normalizer(data, schema);
```

