/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/test.js TAP compatible with gulp-sourcemaps > must match snapshot 1`] = `
Array [
  Object {
    "contents": String(
      var value = 'Hello World';
      
      console.log(value);
      
      //# sourceMappingURL=input1.js.map
      
    ),
    "relative": "fixtures/input1.js",
    "sourceMap": Object {
      "file": "input1.js",
      "mappings": "AAAA,YAAe,aAAa;;ACE5B,OAAO,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC",
      "names": Array [],
      "sourceRoot": undefined,
      "sources": Array [
        "import1.js",
        "input1.js",
      ],
      "sourcesContent": Array [
        "export default 'Hello World';\\n",
        String(
          import value from './import1.js';
          
          console.log(value);
          
        ),
      ],
      "version": 3,
    },
  },
  Object {
    "contents": "{\\"version\\":3,\\"file\\":\\"input1.js\\",\\"sources\\":[\\"import1.js\\",\\"input1.js\\"],\\"sourcesContent\\":[\\"export default 'Hello World';\\\\n\\",\\"import value from './import1.js';\\\\n\\\\nconsole.log(value);\\\\n\\"],\\"names\\":[],\\"mappings\\":\\"AAAA,YAAe,aAAa;;ACE5B,OAAO,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC\\"}",
    "relative": "fixtures/input1.js.map",
    "sourceMap": Object {
      "file": "input1.js",
      "mappings": "AAAA,YAAe,aAAa;;ACE5B,OAAO,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC",
      "names": Array [],
      "sourceRoot": undefined,
      "sources": Array [
        "import1.js",
        "input1.js",
      ],
      "sourcesContent": Array [
        "export default 'Hello World';\\n",
        String(
          import value from './import1.js';
          
          console.log(value);
          
        ),
      ],
      "version": 3,
    },
  },
]
`

exports[`test/test.js TAP module import and copy all files > must match snapshot 1`] = `
Array [
  Object {
    "contents": String(
      var value1 = 'fake-module';
      
      var value2 = '@cfware/fake-module';
      
      console.log(value1, value2);
      
    ),
    "relative": "fixtures/import-module.js",
    "sourceMap": Object {
      "file": "import-module.js",
      "mappings": "AAAA,aAAe,aAAf;;ACAA,aAAe,qBAAf;;ACGAA,OAAO,CAACC,GAAR,CAAYC,MAAZ,EAAoBC,MAApB",
      "names": Array [
        "console",
        "log",
        "value1",
        "value2",
      ],
      "sources": Array [
        "node_modules/fake-module/index.js",
        "node_modules/@cfware/fake-module/index.js",
        "import-module.js",
      ],
      "sourcesContent": Array [
        "export default 'fake-module';\\n",
        "export default '@cfware/fake-module';\\n",
        String(
          import value1 from 'fake-module';
          import value2 from '@cfware/fake-module';
          
          console.log(value1, value2);
          
        ),
      ],
      "version": 3,
    },
  },
  Object {
    "contents": "export default '@cfware/fake-module';\\n",
    "relative": "fixtures/node_modules/@cfware/fake-module/index.js",
    "sourceMap": undefined,
  },
  Object {
    "contents": String(
      {
      \\t"name": "@cfware/fake-module",
      \\t"description": "Local test harness",
      \\t"private": true,
      \\t"version": "0.0.0",
      \\t"main": "index.js"
      }
      
    ),
    "relative": "fixtures/node_modules/@cfware/fake-module/package.json",
    "sourceMap": undefined,
  },
  Object {
    "contents": "export default 'fake-module';\\n",
    "relative": "fixtures/node_modules/fake-module/index.js",
    "sourceMap": undefined,
  },
  Object {
    "contents": String(
      {
      \\t"name": "fake-module",
      \\t"description": "Local test harness",
      \\t"private": true,
      \\t"version": "0.0.0",
      \\t"main": "index.js"
      }
      
    ),
    "relative": "fixtures/node_modules/fake-module/package.json",
    "sourceMap": undefined,
  },
]
`

exports[`test/test.js TAP module import and copy all files with vinylOptions > must match snapshot 1`] = `
Array [
  Object {
    "contents": "export default '@cfware/fake-module';\\n",
    "relative": "fixtures/node_modules/@cfware/fake-module/index.js",
    "sourceMap": undefined,
  },
  Object {
    "contents": String(
      {
      \\t"name": "@cfware/fake-module",
      \\t"description": "Local test harness",
      \\t"private": true,
      \\t"version": "0.0.0",
      \\t"main": "index.js"
      }
      
    ),
    "relative": "fixtures/node_modules/@cfware/fake-module/package.json",
    "sourceMap": undefined,
  },
  Object {
    "contents": "export default 'fake-module';\\n",
    "relative": "fixtures/node_modules/fake-module/index.js",
    "sourceMap": undefined,
  },
  Object {
    "contents": String(
      {
      \\t"name": "fake-module",
      \\t"description": "Local test harness",
      \\t"private": true,
      \\t"version": "0.0.0",
      \\t"main": "index.js"
      }
      
    ),
    "relative": "fixtures/node_modules/fake-module/package.json",
    "sourceMap": undefined,
  },
  Object {
    "contents": String(
      var value1 = 'fake-module';
      
      var value2 = '@cfware/fake-module';
      
      console.log(value1, value2);
      
    ),
    "relative": "import-module.js",
    "sourceMap": Object {
      "file": "import-module.js",
      "mappings": "AAAA,aAAe,aAAf;;ACAA,aAAe,qBAAf;;ACGAA,OAAO,CAACC,GAAR,CAAYC,MAAZ,EAAoBC,MAApB",
      "names": Array [
        "console",
        "log",
        "value1",
        "value2",
      ],
      "sources": Array [
        "node_modules/fake-module/index.js",
        "node_modules/@cfware/fake-module/index.js",
        "import-module.js",
      ],
      "sourcesContent": Array [
        "export default 'fake-module';\\n",
        "export default '@cfware/fake-module';\\n",
        String(
          import value1 from 'fake-module';
          import value2 from '@cfware/fake-module';
          
          console.log(value1, value2);
          
        ),
      ],
      "version": 3,
    },
  },
]
`

exports[`test/test.js TAP module import and license files only > must match snapshot 1`] = `
Array [
  Object {
    "contents": String(
      var value1 = 'fake-module';
      
      var value2 = '@cfware/fake-module';
      
      console.log(value1, value2);
      
    ),
    "relative": "fixtures/import-module.js",
    "sourceMap": Object {
      "file": "import-module.js",
      "mappings": "AAAA,aAAe,aAAf;;ACAA,aAAe,qBAAf;;ACGAA,OAAO,CAACC,GAAR,CAAYC,MAAZ,EAAoBC,MAApB",
      "names": Array [
        "console",
        "log",
        "value1",
        "value2",
      ],
      "sources": Array [
        "node_modules/fake-module/index.js",
        "node_modules/@cfware/fake-module/index.js",
        "import-module.js",
      ],
      "sourcesContent": Array [
        "export default 'fake-module';\\n",
        "export default '@cfware/fake-module';\\n",
        String(
          import value1 from 'fake-module';
          import value2 from '@cfware/fake-module';
          
          console.log(value1, value2);
          
        ),
      ],
      "version": 3,
    },
  },
  Object {
    "contents": String(
      {
      \\t"name": "@cfware/fake-module",
      \\t"description": "Local test harness",
      \\t"private": true,
      \\t"version": "0.0.0",
      \\t"main": "index.js"
      }
      
    ),
    "relative": "fixtures/node_modules/@cfware/fake-module/package.json",
    "sourceMap": undefined,
  },
  Object {
    "contents": String(
      {
      \\t"name": "fake-module",
      \\t"description": "Local test harness",
      \\t"private": true,
      \\t"version": "0.0.0",
      \\t"main": "index.js"
      }
      
    ),
    "relative": "fixtures/node_modules/fake-module/package.json",
    "sourceMap": undefined,
  },
]
`

exports[`test/test.js TAP module import with no copy > must match snapshot 1`] = `
Array [
  Object {
    "contents": String(
      var value1 = 'fake-module';
      
      var value2 = '@cfware/fake-module';
      
      console.log(value1, value2);
      
    ),
    "relative": "fixtures/import-module.js",
    "sourceMap": Object {
      "file": "import-module.js",
      "mappings": "AAAA,aAAe,aAAf;;ACAA,aAAe,qBAAf;;ACGAA,OAAO,CAACC,GAAR,CAAYC,MAAZ,EAAoBC,MAApB",
      "names": Array [
        "console",
        "log",
        "value1",
        "value2",
      ],
      "sources": Array [
        "node_modules/fake-module/index.js",
        "node_modules/@cfware/fake-module/index.js",
        "import-module.js",
      ],
      "sourcesContent": Array [
        "export default 'fake-module';\\n",
        "export default '@cfware/fake-module';\\n",
        String(
          import value1 from 'fake-module';
          import value2 from '@cfware/fake-module';
          
          console.log(value1, value2);
          
        ),
      ],
      "version": 3,
    },
  },
]
`

exports[`test/test.js TAP multiple output files > must match snapshot 1`] = `
Array [
  Object {
    "contents": String(
      'use strict';
      
      var value1 = 'fake-module';
      
      var value2 = '@cfware/fake-module';
      
      console.log(value1, value2);
      
    ),
    "relative": "fixtures/import-module.js",
    "sourceMap": Object {
      "file": "import-module.js",
      "mappings": ";;AAAA,aAAe,aAAf;;ACAA,aAAe,qBAAf;;ACGAA,OAAO,CAACC,GAAR,CAAYC,MAAZ,EAAoBC,MAApB",
      "names": Array [
        "console",
        "log",
        "value1",
        "value2",
      ],
      "sources": Array [
        "node_modules/fake-module/index.js",
        "node_modules/@cfware/fake-module/index.js",
        "import-module.js",
      ],
      "sourcesContent": Array [
        "export default 'fake-module';\\n",
        "export default '@cfware/fake-module';\\n",
        String(
          import value1 from 'fake-module';
          import value2 from '@cfware/fake-module';
          
          console.log(value1, value2);
          
        ),
      ],
      "version": 3,
    },
  },
  Object {
    "contents": String(
      var value1 = 'fake-module';
      
      var value2 = '@cfware/fake-module';
      
      console.log(value1, value2);
      
    ),
    "relative": "fixtures/import-module.mjs",
    "sourceMap": Object {
      "file": "import-module.mjs",
      "mappings": "AAAA,aAAe,aAAf;;ACAA,aAAe,qBAAf;;ACGAA,OAAO,CAACC,GAAR,CAAYC,MAAZ,EAAoBC,MAApB",
      "names": Array [
        "console",
        "log",
        "value1",
        "value2",
      ],
      "sources": Array [
        "node_modules/fake-module/index.js",
        "node_modules/@cfware/fake-module/index.js",
        "import-module.js",
      ],
      "sourcesContent": Array [
        "export default 'fake-module';\\n",
        "export default '@cfware/fake-module';\\n",
        String(
          import value1 from 'fake-module';
          import value2 from '@cfware/fake-module';
          
          console.log(value1, value2);
          
        ),
      ],
      "version": 3,
    },
  },
  Object {
    "contents": String(
      {
      \\t"name": "@cfware/fake-module",
      \\t"description": "Local test harness",
      \\t"private": true,
      \\t"version": "0.0.0",
      \\t"main": "index.js"
      }
      
    ),
    "relative": "fixtures/node_modules/@cfware/fake-module/package.json",
    "sourceMap": undefined,
  },
  Object {
    "contents": String(
      {
      \\t"name": "fake-module",
      \\t"description": "Local test harness",
      \\t"private": true,
      \\t"version": "0.0.0",
      \\t"main": "index.js"
      }
      
    ),
    "relative": "fixtures/node_modules/fake-module/package.json",
    "sourceMap": undefined,
  },
]
`

exports[`test/test.js TAP valid file > must match snapshot 1`] = `
Array [
  Object {
    "contents": String(
      var value = 'Hello World';
      
      console.log(value);
      
    ),
    "relative": "fixtures/input1.js",
    "sourceMap": undefined,
  },
]
`

exports[`test/test.js TAP valid file with sourcemaps enabled > must match snapshot 1`] = `
Array [
  Object {
    "contents": String(
      var value = 'Hello World';
      
      console.log(value);
      
    ),
    "relative": "fixtures/input1.js",
    "sourceMap": Object {
      "file": "input1.js",
      "mappings": "AAAA,YAAe,aAAa;;ACE5B,OAAO,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC",
      "names": Array [],
      "sources": Array [
        "import1.js",
        "input1.js",
      ],
      "sourcesContent": Array [
        "export default 'Hello World';\\n",
        String(
          import value from './import1.js';
          
          console.log(value);
          
        ),
      ],
      "version": 3,
    },
  },
]
`
