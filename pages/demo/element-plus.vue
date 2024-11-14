<script setup lang="ts">
// PageDemoElementPlus 請填寫功能描述👈

const options =
  ['Beijing', 'Shanghai', 'Nanjing', 'Chengdu', 'Shenzhen', 'Guangzhou']
    .map((value) => ({ value, label: value }));

const demoParams = ref({
  selectVal: '',
  inputVal: '',
  numberVal: 0,
  dateVal: ''
});

const rules = computed(() => {
  return {
    selectVal: [{ required: true, message: '請輸入', trigger: 'change' }],
    inputVal: [{ required: true, message: '請選擇', trigger: 'change' }],
    numberVal: [{ required: true, message: '請輸入', trigger: 'change' }],
    dateVal: [{ required: true, message: '請輸入', trigger: 'change' }]
  };
});

const OnSubmit = () => {
  console.log('OnSubmit');
};
</script>

<template lang="pug">
.PageDemoElementPlus
  p PageDemoElementPlus
  p 箭頭 替換
  ElSelect(
    v-model="demoParams.selectVal"
    placeholder="Select"
    clearable
    suffix-icon="Arrow"
  )
    ElOption(
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    )
  .gap
  ElInput(v-model="demoParams.inputVal")
    template(#suffix)
      p $
  .gap
  //-----------------------------------------------------------------------------------------------
  ElForm(
    ref="elForm"
    :model="demoParams"
    :rules="rules"
    label-width="120"
    label-position="top"
    require-asterisk-position="right"
    @submit.prevent
    @submit="OnSubmit"
  )
    ElFormItem(label="dateVal" prop="dateVal")
      ElDatePicker(
        v-model="demoParams.dateVal"
        style="width: 270px"
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        placeholder="Pick a day"
        clearable
        :editable="false"
      )
    ElFormItem(label="dateVal" prop="dateVal")
      ElDatePicker(
        v-model="demoParams.dateVal"
        style="width: 270px"
        type="date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        placeholder="Pick a day"
        clearable
        :editable="false"
      )

    ElFormItem(label="Select" prop="selectVal")
      ElSelect(
        v-model="demoParams.selectVal"
        placeholder="Select"
        clearable
      )
        ElOption(
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        )
    ElFormItem(label="Input" prop="inputVal")
      ElInput(
        v-model.trim="demoParams.inputVal"
        placeholder="Input"
        maxlength="200"
      )
    ElFormItem(label="P Input" prop="inputVal")
      ElInput(
        v-model.trim="demoParams.inputVal"
        placeholder="Password"
        type="password"
        show-password
        maxlength="200"
      )
    ElFormItem(label="numberVal" prop="numberVal")
      el-input-number(
        v-model="demoParams.numberVal"
        :min="1"
        :max="10"
        )
  ElButton(type="default") default
  ElButton(type="primary") Primary
  ElButton(type="success") success
  ElButton(type="info") info
  ElButton(type="warning") warning
  ElButton(type="danger") danger

  ElButton(type="default" plain) default
  ElButton(type="primary" plain) Primary
  ElButton(type="success" plain) success
  ElButton(type="info" plain) info
  ElButton(type="warning" plain) warning
  ElButton(type="danger" plain) danger
</template>

<style lang="scss" scoped>
// 佈局 ----
.PageDemoElementPlus {
  // TODO
  padding: 20px;
}

// 組件 ----
.gap {
  height: 10px;
}
</style>
