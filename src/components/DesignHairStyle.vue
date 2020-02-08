<template>
    <div class="col-md-2">
        {{hairStyleInput.name}}&nbsp;<input type="text" style="width:75px;" v-model.number="hairStyleInput.value" class="form-control selectionAuto"/>
        &nbsp;
        <input type="checkbox" name="1" value="cutAssistant" id="cutAssistant" v-model="assistantHelps">
        <label for="cutAssistant"><span></span>助理</label>
    </div>
</template>

<script>
export default {
    name: 'TcsDesignHairStyle',
    data() {
        return {
            assistantHelps: []
        }
    },
    props:['hairStyleInput']
}
</script>
