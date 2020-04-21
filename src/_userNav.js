export default {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
        badge: {
          variant: 'info',
          text: 'NEW',
        },
      },
      {
        title: true,
        name: 'Product',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Product Upload',
        url: '/product/upload',
        icon: 'icon-star',
      },
      {
        name: 'Brochure Display',
        url: '/brochureDisplay',
        icon: 'icon-star',
      },
      {
        title: true,
        name: 'Other',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'VR',
        url: '/VR',
        icon: 'icon-star',
      },
      {
        name: 'Currency',
        url: '/Currency',
        icon: 'icon-star',
      },
      // {
      //   name: 'Pages',
      //   url: '/pages',
      //   icon: 'icon-star',
      //   children: [
      //     {
      //       name: 'Login',
      //       url: '/login',
      //       icon: 'icon-star',
      //     },
      //     {
      //       name: 'Register',
      //       url: '/register',
      //       icon: 'icon-star',
      //     },
      //     {
      //       name: 'Error 404',
      //       url: '/404',
      //       icon: 'icon-star',
      //     },
      //     {
      //       name: 'Error 500',
      //       url: '/500',
      //       icon: 'icon-star',
      //     },
         
      //   ],
      // },
    ],
  };
  