import proj4 from 'proj4'

proj4.defs([
  [
    'EPSG:4326',
    '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees',
  ],
  [
    'EPSG:3826',
    '+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs',
  ],
  [
    'EPSG:3828',
    '+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=aust_SA',
  ],
])

const EPSG3826 = new proj4.Proj('EPSG:3826') // TWD97 121分帶
const EPSG3828 = new proj4.Proj('EPSG:3828') // TWD67 121分帶
const EPSG4326 = new proj4.Proj('EPSG:4326') // WGS84

export { proj4, EPSG3826, EPSG4326, EPSG3828 }
