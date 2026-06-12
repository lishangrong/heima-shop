/** 首页-广告区域数据类型 */
export type BannerItem = {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  id: string
  /** 图片链接 */
  imgUrl: string
  /** 跳转类型 */
  type: number
}

/** 首页-前台类目数据类型 */
export type CategoryItem = {
  /** 图标路径 */
  icon: string
  /** id */
  id: string
  /** 分类名称 */
  name: string
}

/** 首页-推荐专区数据类型 */
export type HotItem = {
  /** id */
  id: string
  /** 推荐标题 */
  title: string
  /** 推荐类型 */
  type: number
  /** 推荐说明 */
  alt: string
  /** 图片集合 */
  pictures: string[]
}

/** 首页-猜你喜欢商品数据类型 */
export type GuessLikeItem = {
  /** 商品id */
  id: string
  /** 商品名称 */
  name: string
  /** 商品价格 */
  price: number
  /** 商品图片 */
  picture: string
  /** 商品描述 */
  desc?: string
  /** 已下单数量 */
  orderNum?: number
}

/** 分页响应数据类型 */
export type PageResult<T> = {
  /** 总条数 */
  counts: number
  /** 当前页码 */
  page: number
  /** 总页数 */
  pages: number
  /** 每页条数 */
  pageSize: number
  /** 当前页数据 */
  items: T[]
}
