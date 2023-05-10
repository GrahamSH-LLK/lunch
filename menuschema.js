[
    { name: 'id', type: { name: null, kind: 'NON_NULL' } },
    { name: 'name', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'rating_average', type: { name: 'Float', kind: 'SCALAR' } },
    { name: 'rating_count', type: { name: 'Int', kind: 'SCALAR' } },
    {
      name: 'organization',
      type: { name: 'Organization', kind: 'OBJECT' }
    },
    {
      name: 'OnlineMenuDesignSettings',
      type: { name: 'OnlineMenuDesignSettings', kind: 'OBJECT' }
    },
    { name: 'allergen_dairy', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'allergen_egg', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'allergen_fish', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'allergen_gluten', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'allergen_milk', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'allergen_peanut', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'allergen_pork', type: { name: 'String', kind: 'SCALAR' } },
    {
      name: 'allergen_shellfish',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'allergen_soy', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'allergen_sesame', type: { name: 'String', kind: 'SCALAR' } },
    {
      name: 'allergen_treenuts',
      type: { name: 'String', kind: 'SCALAR' }
    },
    {
      name: 'allergen_vegetarian',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'allergen_wheat', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'allergen_other', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'customAllergens', type: { name: null, kind: 'LIST' } },
    {
      name: 'allow_online_ordering',
      type: { name: 'String', kind: 'SCALAR' }
    },
    {
      name: 'beans_peas_legumes',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'category', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'enabled', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'food_group', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'fruit', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'fruit_juice', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'grains', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'green_vegetable', type: { name: 'String', kind: 'SCALAR' } },
    {
      name: 'hide_on_calendars',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'hide_on_mobile', type: { name: 'Boolean', kind: 'SCALAR' } },
    { name: 'image_url1', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'image_url2', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'is_ancillary', type: { name: 'Boolean', kind: 'SCALAR' } },
    {
      name: 'long_description',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'ingredients', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'meal', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'meat', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'milk', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'other_vegetable', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'pdf_url', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'portion_size', type: { name: 'String', kind: 'SCALAR' } },
    {
      name: 'portion_size_unit',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'price', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_allergens', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_calcium', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_calories', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_carbs', type: { name: 'String', kind: 'SCALAR' } },
    {
      name: 'prod_cholesterol',
      type: { name: 'String', kind: 'SCALAR' }
    },
    {
      name: 'prod_dietary_fiber',
      type: { name: 'String', kind: 'SCALAR' }
    },
    {
      name: 'prod_gram_weight',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'prod_iron', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_mfg', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_protein', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_sat_fat', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_sodium', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_total_fat', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_trans_fat', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_vita_iu', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_vita_re', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'prod_vitc', type: { name: 'String', kind: 'SCALAR' } },
    {
      name: 'product_fullname',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'productID', type: { name: 'String', kind: 'SCALAR' } },
    {
      name: 'providerProductID',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'red_vegetable', type: { name: 'String', kind: 'SCALAR' } },
    {
      name: 'starchy_vegetable',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'sugar', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'trash', type: { name: 'Boolean', kind: 'SCALAR' } },
    {
      name: 'total_gram_weight',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'vegetable', type: { name: 'String', kind: 'SCALAR' } },
    {
      name: 'visible_month_cal',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'whole_grain', type: { name: 'String', kind: 'SCALAR' } },
    { name: 'attachments', type: { name: null, kind: 'LIST' } },
    {
      name: 'hide_on_web_menu_view',
      type: { name: 'String', kind: 'SCALAR' }
    },
    { name: 'global', type: { name: 'Boolean', kind: 'SCALAR' } },
    { name: 'SID', type: { name: 'String', kind: 'SCALAR' } },
    {
      name: 'mealsPlusCustomAllergens',
      type: { name: null, kind: 'LIST' }
    },
    {
      name: 'mealsPlusCustomAttributes',
      type: { name: null, kind: 'LIST' }
    }
  ]