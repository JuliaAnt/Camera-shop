export enum AppRoute {
  Camera = '/camera/:id',
  Catalog = '/',
  Basket = '/basket',
}

export enum NameSpace {
  CatalogData = 'CATALOG_DATA',
  QuestsData = 'QUESTS_DATA',
  Basket = 'BASKET',
}

export enum APIRoute {
  Products = '/cameras',
  SelectedQuest = '/quest/{questId}',
  Login = '/login',
  Logout = '/logout',
  BookedQuests = '/reservation',
  BookingInfo = '/quest/{questId}/booking'
}
