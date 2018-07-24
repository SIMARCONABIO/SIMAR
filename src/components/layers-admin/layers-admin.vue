<template>
  <div class="layers-admin-mask">
    <div class="layers-admin-container">
      <header class="layers-admin-header d-flex justify-content-between align-items-center">
        <h3>
          <i class="icon-layers"/>
          ADMINISTRADOR DE CAPAS
        </h3>
        <button
          class="btn btn-transparent"
          @click="onClose">
          <i class="icon-x"/>
        </button>
      </header>
      <main class="layers-admin-body row no-gutters">
        <div class="layers-category-container col">
          <ul>
            <li
              v-for="(category, categoryIndex) in layersTree"
              :key="category.id"
              :class="{'active-border': activeBorder[categoryIndex].active }"
              @click="activeBorderChange(category.id, categoryIndex)"
            >
              <a
                @click="setActiveCategory(categoryIndex)">
                <div class="layer-category-inner category-column-inner">
                  <div class="layer-category-alias">
                    <category-identifier
                      :color="category.color"
                      :text="category.abbreviation"/>
                    <span v-html="category.main_name"/>
                  </div>
                  <div
                    class="layer-category-name"
                    v-html="category.name"/>
                  <div class="catalog-title">{{ category.english_name }}</div>
                  <i class="icon-chevron-right"/>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="layers-products-container col">
          <el-collapse
            @change="collapseChange"
            :accordion="true"
            v-model="subCategoryId"
          >
            <el-collapse-item
              v-for="(subcategory, subcategoryIndex) in layersTree[activeCategory].subcategories"
              :key="subcategoryIndex"
              :name="subcategory.id"
            >
              <template slot="title">
                <div class="subcategory-title">{{ subcategory.name }}</div>
                <div class="subcategory-subtitle">{{ subcategory.english_name }}</div>
              </template
              >
              <div
                class="layer-category-inner product-catalog"
                v-for="(layer, index) in showCatalogs"
                :key="index"
                :class="{'active-border': activeBorderSubLayer[index].active }"
                @click="focusCatalogItem(layer, layer.id, index)">
                <div class="layer-category-alias">{{ layer.spanishTitle }}</div>
                <div class="catalog-title">{{ layer.title }}</div>
                <div class="layer-category-name">{{ layer.subtitle }}</div>
                <div
                  class="catalog-from"
                  v-if="layer.link && layer.from">Fuente: <a
                    :href="layer.link"
                    target="_blank">{{ layer.from }}</a>
                </div>
                <div class="switch-container">
                  <el-switch
                    :inactive-color="'#ffffff'"
                    v-model="layer.add"
                    @change="(value)=>onChange(value, layer)"/>
                </div>
              </div>
            </el-collapse-item>
            <div
              class="development"
              v-if="layersTree[activeCategory].subcategories == null">
              <div class="message">
                <span>Sistema actualmente en desarrollo...</span>
                <span class="englishMessage">System currently in development...</span>
              </div>
            </div>
          </el-collapse>
        </div>
        <div
          v-if="catalogItem || activeCategory >= 0"
          class="layers-product-info-container col">
          <div
            class="catalog-item-container"
            v-if="catalogItem">
            <img
              :src="apiUrl+catalogItem.thumbImage"
              alt=""
            >
            <div class="catalog-item-info-body">
              <h3 class="catalog-item-title">
                {{ catalogItem.spanishTitle }}
              </h3>
              <div
                class="data-label"
                v-if="catalogItem.description">
                DESCRIPCIÓN
              </div>
              <div
                v-if="catalogItem.description"
                v-html="catalogItem.description"/>
            </div>
          </div>
          <div
            class="catalog-item-container"
            v-else>
            <div class="catalog-item-info-body">
              <h3
                class="catalog-item-title"
                v-html="layersTree[activeCategory].main_name"/>
              <div
                v-html="layersTree[activeCategory].description || 'XXXX'"/>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import CategoryIdentifier from '@/components/_shared/category-identifier'

export default {
  name: 'LayersAdmin',
  inject: {
    layersTree: 'geoportal-view/layersTree',
    catalogs: 'geoportal-view/catalogs'
  },
  components: {
    CategoryIdentifier
  },
  data () {
    return {
      apiUrl: process.env.API_ASSETS_URL,
      activeCategory: 0,
      subCategoryId: this.layersTree[0].subcategories[0].id,
      catalogItem: null,
      activeBorder: [
        {active: true},
        {active: false},
        {active: false},
        {active: false},
        {active: false},
        {active: false},
        {active: false},
        {active: false}
      ],
      activeId: 0,
      activeBorderSubLayer: [
        {active: false},
        {active: false},
        {active: false},
        {active: false},
        {active: false},
        {active: false},
        {active: false},
        {active: false}
      ],
      activeIdSubLayer: 0
    }
  },
  mounted () {
    this.layersTree = this.layersTree.sort(function (a, b) {
      return a.order - b.order
    })
  },
  computed: {
    showCatalogs () {
      return this.catalogs.filter(catalog => {
        return catalog.categoryId === this.subCategoryId
      }).sort(function (a, b) {
        return a.order - b.order
      })
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
      for (var i = 0; i < this.activeBorder.length; i++) {
        this.activeBorder[i].active = false
      }
      for (var s = 0; s < this.activeBorderSubLayer.length; s++) {
        this.activeBorderSubLayer[s].active = false
      }
    },
    onChange (val, layer) {
      if (val) {
        this.$emit('addLayer', layer)
      } else {
        this.$emit('removeLayer', layer)
      }
    },
    collapseChange (val) {
      this.subCategoryId = val
    },
    setActiveCategory (index) {
      this.activeCategory = index
      this.subCategoryId = this.layersTree[index].subcategories[0].id
      this.catalogItem = null
    },
    focusCatalogItem (catalogItem, id, index) {
      this.catalogItem = catalogItem

      if (id !== undefined) {
        this.activeIdSubLayer = id
        if (id === this.activeIdSubLayer) {
          this.activeBorderSubLayer[index].active = true
        }
      }

      for (var i = 0; i < this.activeBorderSubLayer.length; i++) {
        var catg = this.showCatalogs[i]
        if (catg && catg['id']) {
          if (this.showCatalogs[i].id !== id) {
            this.activeBorderSubLayer[i].active = false
          }
        }
      }
    },
    activeBorderChange (id, index) {
      this.activeId = id
      if (id === this.activeId) {
        this.activeBorder[index].active = true
      }

      for (var i = 0; i < this.activeBorder.length; i++) {
        if (this.layersTree[i].id !== id) {
          this.activeBorder[i].active = false
        }
      }

      for (var s = 0; s < this.activeBorderSubLayer.length; s++) {
        this.activeBorderSubLayer[s].active = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .layers-admin-mask {
    position: absolute;
    z-index: 1010;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));
  }
  .development{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    height: 50vh;
    width: 100%;
    .message{
      @include font-primary();
      text-align: center;
      width: 50%;
      height: 30px;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      .englishMessage{
        display: block;
        font-style: italic;
      }
    }
  }
  .subcategory-title{
    width: 90%;
    white-space: normal;
    height: auto !important;
  }
  .subcategory-subtitle{
    width: 90%;
    white-space: normal;
    height: auto !important;
  }
  .layers-admin-container {
    width: 90%;
    height: 100%;
    background: $color-ui-primary-dark;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    .layers-admin-header {
      padding: 0 10px;
      height: 40px;
      border-bottom: 1px solid #000000;
      h3 {
        @include font-primary(10px, bold);
        i {
          position: relative;
          top: 2px;
          margin-right: 5px;
          font-size: 15px;
        }
      }
      button {
        font-size: 20px;
      }
    }
  }

  .layers-admin-body {
    height: calc(100% - 40px);
    color: #000000;
    .col {
      overflow: auto;
    }
    .layers-products-container {
      border-right: 1px solid #cccccc;
      background: rgb(228, 228, 228);
      .active-border{
        background: #c1c1c1;
        box-shadow: inset 5px 0px 0px 0px rgba(35,161,200,1);
      }
    }
    .layers-product-info-container {
      background: #ffffff;
    }
    .layers-category-container {
      background: rgb(193, 193, 193);
      border-right: 1px solid #666666;
      ul {
        list-style: none;
        padding: 0;
        .active-border{
          background: rgb(161, 161, 161);
          box-shadow: inset 5px 0px 0px 0px rgba(35,161,200,1);
        }
        li {
          border-bottom: 1px solid #666666;
          a {
            cursor: pointer;
            &:hover {
              i {
                color: $color-font-active;
              }
            }
          }
        }
      }
    }
    .layer-category-inner {
      padding: 20px;
      position: relative;
      i {
        position: absolute;
        right: 20px;
        top: 50%;
        font-size: 15px;
        margin-top: -8px;
      }
      .layer-category-alias, .layer-category-name, .catalog-title, .catalog-from {
        padding-right: 50px;
      }
      .switch-container {
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -13px;
      }
      cursor: pointer;
      .layer-category-alias {
        font-size: 14px;
        color: #000000;
      }
      .layer-category-name {
        font-size: 14px;
        color: #000000;
      }
      .catalog-title {
        font-size: 12px;
        font-style: italic;
        color: #000000;
      }
      .catalog-from {
        font-size: 12px;
        color: #000000;
      }
      &.category-column-inner {
        padding: 15px 20px;
        .layer-category-alias {
          font-size: 16px;
        }
        .layer-category-name {
          padding-left: 30px;
        }
        .catalog-title {
          padding-left: 30px;
        }
      }
    }
  }

  .catalog-item-info-body {
    padding: 20px;
  }

  .catalog-item-container {
    img {
      width: 100%;
    }
    h3 {
      @include font-primary(28px, light);
      color: #333333;
    }
  }
  .subcategory-subtitle{
    font-weight: 300;
    font-style: italic;
  }
</style>
