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

/** 首页-热门推荐(推荐专区)数据类型 */
export type HotItem = {
  /** id */
  id: string
  /** 推荐标题 */
  title: string
  /** 推荐类型 */
  type: number
  /** 推荐说明 */
  alt: string
  /** 图片集合 [图片路径] */
  pictures: string[]
}

/** 猜你喜欢-商品数据类型 */
export type GuessItem = {
  /** id */
  id: string
  /** 商品名称 */
  name: string
  /** 商品描述 */
  desc: string
  /** 商品价格 */
  price: number
  /** 商品图片 */
  picture: string
  /** 商品销量 */
  orderNum: number
}

/** 通用分页请求参数类型 */
export type PageParams = {
  /** 页码，默认值为 1 */
  page?: number
  /** 每页条数，默认值为 10 */
  pageSize?: number
}

/** 通用分页结果类型 */
export type PageResult<T> = {
  /** 总条数 */
  counts: number
  /** 当前页数据列表 */
  items: T[]
  /** 当前页码 */
  page: number
  /** 每页条数 */
  pageSize: number
  /** 总页数 */
  pages: number
}
