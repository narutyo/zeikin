<template>
  <v-list>
    <ExpenditureList :items="items" />
  </v-list>
</template>

<script setup>
  const route = useRoute()
  const { expenditure } = useExpenditure();

  useHead({
    title: '都道府県別／目的別歳出',
  })

  const items = ref([])
  const sheetRow = ref([])
  const delay = ref(0)
  const stracture = ref({})

  onMounted(async () => {
    const index = Number(route.params.row) + 1
    await exFetch('Prefectures!' + index + ':' + index,
      {
        method: 'GET'
      }).then((response) => {
        sheetRow.value = response.values[0]
        shaper()
      }).catch((error) => {
        console.error(error)
      })
  })

  const shaper = () => {
    const expenditureConfig = expenditure[sheetRow.value[1]]
    delay.value = expenditureConfig.delay
    stracture.value = expenditureConfig.stracture
    items.value = Object.keys(stracture.value).map((item) => {
      return conv(item, stracture.value)
    })
  }

  const conv = (num, parent) => {
    const setting = parent[num]
    const cost = sheetRow.value[Number(num) + delay.value].replace(/,/g, '')
    const ret = {
      name: setting.name + ': ' + (isNaN(cost) ? 0 : cost)
    }
    if (setting.child) { ret.children = childConv(setting.child) }
    return ret
  }
  const childConv = (child) => {
    return Object.keys(child).map((item) => {
      return conv(item, child)
    })
  }
</script>
