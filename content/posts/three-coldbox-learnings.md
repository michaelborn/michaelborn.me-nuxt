+++
date = '2019-12-18T16:13:57-04:00'
tags = [ 'cfml', 'coldfusion', 'coldbox' ]
draft = false
title = 'Three ColdBox Features I Learned While Building A URL Shortener'
+++

Last night I did another live-stream where I finished the first draft of a URL shortener I'm calling "cfShorty". During live-streams I typically end up searching the ColdBox docs for help, but this time [Gavin Pickin](https://twitter.com/gpickin) watched and commented with some cool tips, most of which I'd never used before.

Here are the three ColdBox features I learned while building my URL shortener last night.

## Resourceful Routes

This one was cool. Rather than define and tweak my URL routes manually in `/config/Router.cfc`, Gavin told me how to use the [resourceful routing feature](https://coldbox.ortusbooks.com/the-basics/routing/routing-dsl/resourceful-routes) to auto-generate my CRUD routes for me.

By simply adding `resources( "photos" )` to my ColdBox Router config file (that's `/config/Router.cfc`), ColdBox will set up all the routes necessary for a CRUD management screen:

* List resources page (aka table of entries with Edit/Delete button) via `GET /resource`
* Show individual resource (aka readonly view of a single entry) via `GET /resource/:id`
* Show "New Resource" form to create a new resource entry via `GET /resource/new`
* Show edit form for an existing resource via `GET /resource/:id/edit`

As well as the three main routes necessary for creating, updating and deleting entries from the database:

* Create new resource entry via `POST /resource`
* Update an existing resource entry via `PUT /resource/:id`
* Delete an existing resource entry via `DELETE /resource/:id`

Obviously, I still had to write the code to handle each event, but ColdBox even makes that party easy by offering a CommandBox CLI command which can quickly build out your event handler, HTML view files, a model object, and even base test specs in your `tests/specs` directory:

![Running "coldbox create resource Users" inside the commandbox shell to build handlers, views, models and test files](https://thepracticaldev.s3.amazonaws.com/i/zedt6vnhpx2icliqcvzp.png)

The ["Scaffolding Resources" ColdBox docs](https://coldbox.ortusbooks.com/the-basics/routing/routing-dsl/resourceful-routes#scaffolding-resources) outline this, but it's as easy as running:

```sh
coldbox create resource Users
```

## ColdBox Route Visualizer Module

This module is super handy for debugging your ColdBox routes. Here's what I see when I browse the `/route-visualizer` page to debug my routes in cfShorty:

![ColdBox Route Visualizer debug page shows list of ColdBox routes](https://thepracticaldev.s3.amazonaws.com/i/ytbye9gtkpkae9zx0ikl.png)

To install and use Route Visualizer, all it takes is these three steps:

1.  Run `install route-visualizer --saveDev` from your CommandBox shell
2.  [Reinitialize ColdBox](https://coldbox.ortusbooks.com/getting-started/configuration#reinitializing-an-application) by browsing:
    * `/?fwreinit=mypass` if you have a reinit password set in `config/Coldbox.cfc`, OR
    * `/?fwreinit=1` if no reinit password is configured.
3.  Head to `/route-visualizer` in your ColdBox app.

One thing to note: Make sure to add the `--saveDev` flag when you install Route Visualizer. You might notice in the live-stream recording that I neglected to do this, causing ColdBox to (by default) install this module as a production dependency in `box.json`. **I do not want production users viewing my ColdBox routes**, so I came back later and moved the dependency to `devDependencies` in my `box.json`.

## HTTP Method Spoofing

This is a small tip, but still super useful for my project. Since my cfShorty is a rough draft/prototype, I am not using any frontend JS like Vue. And since I am not using frontend JS, I have no way to edit a route via `PUT /resource/:id` because [HTML forms do not support the PUT method](https://stackoverflow.com/a/8054241). (This is something I was shocked to learn when Gavin told me. I guess I'm used to using `PUT` inside AJAX calls, and never actually tried it in a plain `<form method="PUT">` before.) Likewise, I can't delete any resource entries via `DELETE /resource/:id` because HTML forms do not support the DELETE method either. (And besides - I wanted to use a link tag!)

ColdBox (and Gavin) to the rescue, once again. ColdBox supports [spoofing the HTTP method](https://coldbox.ortusbooks.com/the-basics/routing/http-method-spoofing). All you need to do is add a `_method` url or form parameter which passes your desired HTTP method as the value, like `_method=delete` or `_method=PUT`.

With HTTP method spoofing, hitting the ColdBox `PUT /resource/:id` route is as simple as this:

```html
<form action="#event.buildLink( 'resource.#prc.id#')#" method="POST">
  <input type="hidden" name="_method" value="PUT" />
  <!--- my form goes here --->
</form>
```

Since HTML forms only support `GET` and `POST`, I opted to send the form data via `POST` to hide the data in the request payload (as opposed to in the URL, which is kinda ugly). Then adding a hidden input to my form which passed `_method=PUT` causes ColdBox to execute my `PUT` route, and as easy as that I'm done.

## Conclusion

I learned some cool ColdBox tips this session. If you missed the live-stream, you can catch up with [the recording on YouTube](https://www.youtube.com/watch?v=71uxK3mRYhg) or simply ask me on Twitter. 😄