export const paths = {
  // Public marketplace routes
  marketplace: {
    list: {
      path: "/products",
      getHref: () => "/products",
    },
    detail: {
      path: "/products/:productId",
      getHref: (productId: string) => `/products/${productId}`,
    },
  },
  // Authentication routes
  auth: {
    register: {
      path: "/register",
      getHref: (redirectTo?: string) =>
        `/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    login: {
      path: "/login",
      getHref: (redirectTo?: string) =>
        `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  },
  // Protected dashboard routes (for authenticated users)
  app: {
    dashboard: {
      root: {
        path: "/dashboard",
        getHref: () => "/dashboard",
      },
      myProducts: {
        list: {
          path: "my-products",
          getHref: () => "/dashboard/my-products",
        },
        create: {
          path: "my-products/new",
          getHref: () => "/dashboard/my-products/new",
        },
        edit: {
          path: "my-products/:productId/edit",
          getHref: (productId: string) =>
            `/dashboard/my-products/${productId}/edit`,
        },
      },
      // Transaction history for the user
      transactionHistory: {
        path: "history",
        getHref: () => "/dashboard/history",
      },
    },
  },
} as const;
