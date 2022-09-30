<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          to="/"
          prepend-icon="mdi-home"
          title="Home"
          router
          exact
        >
        </v-list-item>
        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-account-circle"
              title="都道府県別"
            ></v-list-item>
          </template>

          <v-list-group
            v-for="(prefData, index) in prefMenu"
            :key="index"
            no-action
            sub-group
          >
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="prefData.title"
              >
              </v-list-item>
            </template>

            <v-list-item
              v-for="(pref, i) in prefData.children"
              :key="i"
              :to="pref.to"
              router
              exact
              :title="pref.name"
            ></v-list-item>
          </v-list-group>

        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script setup>
  const config = useRuntimeConfig()
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} | ${config.title}` : config.title;
    }
  })

  const clipped = ref(false)
  const drawer = ref(true)
  const fixed = ref(false)
  const miniVariant = ref(false)
  const title = ref(config.title)
  const prefMenu = ref([])

  onMounted(async () => {
    await getPrefecture()
  })

  const getPrefecture = async () => {
    const prefData = await exFetch('Prefectures!A:D',
      {
        method: 'GET'
      })

    const yearList = prefData.values.filter((item, index, self) => {
      const tmp = self.map(item => item[1])
      if (tmp.indexOf(item[1]) === index) {
        return item[1]
      }
      return ''
    })

    yearList.forEach((element) => {
      if (!isNaN(element[1])) {
        const children = prefData.values.map((item, index) => {
          if (item[1] === element[1]) {
            return {
              to: '/prefecture/' + index,
              name: item[3]
            }
          }
          return ''
        }).filter(v => v)

        prefMenu.value.push({
          title: element[1] + '年',
          children
        })
      }
    })
  }

</script>
