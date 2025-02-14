<template>
  <div :class="sideNavCls">
    <t-menu
      :class="menuCls"
      :theme="theme"
      :value="active"
      :collapsed="collapsed"
      :default-expanded="defaultExpanded"
      expand-mutex
    >
      <template #logo>
        <span v-if="showLogo" :class="`${prefix}-side-nav-logo-wrapper`" @click="goHome" class="header-logo-container">
<!--          <component :is="getLogo()" :class="`${prefix}-side-nav-logo-${collapsed ? 't' : 'tdesign'}-logo`" />-->
          <!--          <img :src="`@/assets/assets-njupt${collapsed ? '-' : '-full'}-logo.png`" style="width: 100%;height: 100%;" />-->
          <img v-if="collapsed" src="@/assets/assets-njupt-logo.png" class="logo" />
          <img v-else src="@/assets/assets-njupt-full-logo.png" class="logo" />
        </span>
      </template>
      <menu-content :nav-data="menu" />
      <template #operations>
        <span class="version-container"> {{ !collapsed ? "专利转让系统" : "" }} {{ pgk.version }} </span>
      </template>
    </t-menu>
    <div :class="`${prefix}-side-nav-placeholder${collapsed ? '-hidden' : ''}`"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType } from "vue";
import { useRouter } from "vue-router";
import union from "lodash/union";

import { useSettingStore } from "@/store";
import { prefix } from "@/config/global";
import pgk from "../../../package.json";
import { MenuRoute } from "@/types/interface";
import { getActive, getRoutesExpanded } from "@/router";

import AssetLogo from "@/assets/assets-t-logo.svg?component";
import AssetLogoFull from "@/assets/assets-logo-full.svg?component";
import MenuContent from "./MenuContent.vue";

const MIN_POINT = 992 - 1;

const props = defineProps({
  menu: {
    type: Array as PropType<MenuRoute[]>,
    default: () => []
  },
  showLogo: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  isFixed: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  layout: {
    type: String as PropType<string>,
    default: ""
  },
  headerHeight: {
    type: String as PropType<string>,
    default: "64px"
  },
  theme: {
    type: String as PropType<string>,
    default: "light"
  },
  isCompact: {
    type: Boolean as PropType<boolean>,
    default: false
  }
});

const collapsed = computed(() => useSettingStore().isSidebarCompact);

const active = computed(() => getActive());

const defaultExpanded = computed(() => {
  const path = getActive();
  const parentPath = path.substring(0, path.lastIndexOf("/"));
  const expanded = getRoutesExpanded();
  return union(expanded, parentPath === "" ? [] : [parentPath]);
});

const sideNavCls = computed(() => {
  const { isCompact } = props;
  return [
    `${prefix}-sidebar-layout`,
    {
      [`${prefix}-sidebar-compact`]: isCompact
    }
  ];
});

const menuCls = computed(() => {
  const { showLogo, isFixed, layout } = props;
  return [
    `${prefix}-side-nav`,
    {
      [`${prefix}-side-nav-no-logo`]: !showLogo,
      [`${prefix}-side-nav-no-fixed`]: !isFixed,
      [`${prefix}-side-nav-mix-fixed`]: layout === "mix" && isFixed
    }
  ];
});

const router = useRouter();
const settingStore = useSettingStore();

const autoCollapsed = () => {
  const isCompact = window.innerWidth <= MIN_POINT;
  settingStore.updateConfig({
    isSidebarCompact: isCompact
  });
};

onMounted(() => {
  autoCollapsed();
  window.onresize = () => {
    autoCollapsed();
  };
});

const goHome = () => {
  router.push("/userCenter/userInfo");
};

const getLogo = () => {
  if (collapsed.value) return AssetLogo;
  return AssetLogoFull;
};
</script>

<style lang="less" scoped>
.header-logo-container {
  width: 180px;
  height: 45px;
  display: flex;
  margin-left: 20px;
  color: var(--td-text-color-primary);
  //border: 1px solid red;

  .logo {
    width: 100%;
    height: 100%;
  }
}
</style>
