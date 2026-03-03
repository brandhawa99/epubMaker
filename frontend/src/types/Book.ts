/**
 * ** content.opf file structure **
 * package/
 *  - metadata/
 *    - lang
 *    - title
 *    - creator...
 *  - manifest/
 *    - cover
 *    - title page
 *    - section id="section1" href="OPS/section-0001.xhtml" media-type="application/xhtml+xml"
 *  - spine
 *  - guide
 */
export interface BookPackage {
  Metadata: Metadata;
  Manifest: Manifest;
  Spine: Spine;
  Guide: Guide;
}

interface Spine {
  itemRefs: string[];
}
interface Manifest {
  Items: Item[];
}

interface Item {
  id: string;
  href: string;
  mediaType: string;
}

interface Metadata {
  Title: Title;
  Creator: Creator;
  publisher: string;
  language: string;
  date: string;
}
interface Title {
  main: string;
  subtitle?: string;
}

interface Creator {
  author: string;
  editor?: string;
}

interface Guide {
  References: Reference[];
}
interface Reference {
  type: string;
  href: string;
  title: string;
}
