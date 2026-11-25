---
title: "Improving Elasticsearch Read Performance"
date: '2026-11-25T06:22:06-04:00'
tags: [ 'elasticsearch', 'performance' ]
draft: false
---

I've been thinking about Elasticsearch performance lately, and wanted to capture my thoughts here for longterm access. 

There are a number of ways to optimize Elasticsearch for better search performance, and they tend to fall into a few specific categories:

1. Query design
2. Index Configuration
3. Hardware and Cluster Design

Notice that hardware and Elasticsearch (ES) cluster settings tend to go last, because in my experience they have the smallest impact on performance. (Elasticsearch is fast by design and by default!)

Most of our "optimization" will focus on avoiding the more expensive features and simply letting ES be as fast as it already knows how to be.

## Query Design

* Avoid [runtime fields](https://www.elastic.co/docs/manage-data/data-store/mapping/runtime-fields)
* Avoid [scripted fields](https://www.elastic.co/docs/explore-analyze/find-and-organize/data-views/scripted-fields). (These are deprecated anyway in favor of runtime fields.)
* Avoid [script sort](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/sort-search-results#script-based-sorting). A Painless sort script was responsible for a 10x search slowdown in a client app I work with. (80ms to 800ms)
* Avoid [script score](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-script-score-query)
* Avoid [function score](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-function-score-query)
* Avoid [wildcard queries](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-wildcard-query)
* Avoid [large result sizes](https://www.elastic.co/docs/api/elasticsearch/operation/operation-search#operation-search-size)

I think of these as the top 80% of offenders, though there are certainly other ES query features which can have a big impact on search performance. (One example is [a percolate query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-percolate-query).)

For a full reference, check out [Limit expensive queries](https://www.elastic.co/docs/reference/query-languages/querydsl#query-dsl-allow-expensive-queries) in the ES docs.

## Index Configuration

* Properly tune your shard count and shard/replica ratio to account for your document count, index size, and scaling needs. See [Size your Elasticsearch shards](https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/size-shards)
* Avoid increasing [`index.max_result_window`](https://www.elastic.co/docs/reference/elasticsearch/index-settings/index-modules#index-max-result-window)
* Adjust [`index.refresh_interval`](https://www.elastic.co/docs/reference/elasticsearch/index-settings/index-modules#dynamic-index-settings) to the maximum duration you can allow stale results.
* Adjust [`indices.fielddata.cache.size`](https://www.elastic.co/docs/reference/elasticsearch/configuration-reference/field-data-cache-settings) to prevent unbounded field cache growth.

Again, this is an intentionally short list of what I consider the "low hanging fruit" of optimizing ES read performance.

## Hardware and Cluster Design

* Make sure your [cluster health is green](https://www.elastic.co/docs/api/elasticsearch/operation/operation-health-report), meaning all shards (including replicas) are allocated. 
* Watch your node heap size - ES recommends *at most* 50% of available RAM too avoid starving the OS. (Watch for OOM exceptions.) See [Elasticsearch heap size usage and JVM garbage collection](https://www.elastic.co/search-labs/blog/elasticsearch-heap-size-jvm-garbage-collection).
* Have [dedicated ingest nodes, and dedicated search nodes](https://www.elastic.co/docs/deploy-manage/distributed-architecture/clusters-nodes-shards/node-roles).
* Make sure your ingest payloads are tuned to match the node RAM and CPU resources.
* Ensure [`search.allow_expensive_queries`](https://www.elastic.co/docs/reference/query-languages/querydsl#query-dsl-allow-expensive-queries) is enabled in the cluster settings.

## Conclusion

As I said earlier, Elasticsearch is fast by default. There are a number of features, however, which are computationally expensive and should be avoided for performance reasons. Besides that, as Elasticsearch clusters grow more time should be dedicated to tuning the shard count/replica count, heap, and other cluster management settings that can have an outsized effect on performance