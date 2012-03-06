# About

This is an example playground of using RequireJS to manage dependencies on facaded adapters of various mico-libraries. You can read a more long-winded explanataion at [http://custardbelly.com/blog/2012/03/05/facaded-micro-libraries-and-dependency-management-using-requirejs](http://custardbelly.com/blog/2012/03/05/facaded-micro-libraries-and-dependency-management-using-requirejs).

The basic premise is to provide a common API on modules that share a similar contextual task, but differ in the micro-library that is loaded. These modules will provide a facade to interact with the underlying micro-library so that application code can bew writtern and maintained without regards to change in dependency on a library.

Within the /script/router directory, you will find at least 3 AMD modules that provide the same API to interact with 3 different micro-library implementations of client-side routing. The modules found in /scripts are handed the defined router dependency from main.js upon load through its requirement on the preferred facade.