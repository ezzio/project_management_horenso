    export interface NewsRss {
  items: any;
  rss: IRssObject;
}

export interface IRssObject {
  $: any;
  channel: Array<IRssChannel>;
}

export interface IRssChannel {
  'atom:link': Array<string>;
  description: Array<string>;
  image: Array<IRssImage>;
  item: Array<IRssItem>;
  language: Array<string>;
  lastBuildDate: Date;
  link: Array<string>;
  title: Array<string>;
}

export interface IRssImage {
  link: Array<string>;
  title: Array<string>;
  url: Array<string>;
}

export interface IRssItem {
  category: Array<string>;
  description: Array<string>;
  guid: any;
  link: Array<string>;
  pubDate: Date;
  title: Array<string>;
}
