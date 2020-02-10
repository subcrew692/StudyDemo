<template>
    <div class="col-md-3">
        <div class="input-group">
            <span class="input-group-addon"><slot></slot></span>
            <input class="form-control" type="number" placeholder="金額" v-model.number="money" />
            <span class="input-group-btn">
                <button class="btn btn-default" @click="withAssistant=!withAssistant" :disabled="!money || !hasAssistant">
                    助理 <i class="fa fa-check" v-show="hadleCheck"></i>
                </button>

                <!-- <input type="checkbox" name="1" value="cutAssistant" :id="hairStyleChinese" v-model="withAssistant">
                <label :for="hairStyleChinese"><span></span>助理</label> -->
            </span>
        </div>

        <!-- {{hairStyleChinese}}&nbsp;<input type="text" style="width:75px;" @input="onChange" class="form-control selectionAuto"/>
        &nbsp;
        <input type="checkbox" name="1" value="cutAssistant" :id="hairStyleChinese" v-model="withAssistant">
        <label :for="hairStyleChinese"><span></span>助理</label> -->

    </div>
</template>

<script>
export default {
    name: 'TcsDesignHairStyle',
    data() {
        return {
            assistantHelps: [],
            money: '',
            withAssistant: false,
            assistantButtonClass: 'default'
        }
    },
    props: ['type', 'hasAssistant', 'chtType'],
    methods: {
        onChange($event) {
            // console.log($event)
            // this.$emit('input', +$event.target.value);
        },
        sortDetails() {
            if(!this.money) {
                this.withAssistant = false;
            }
            const result = {
                money: +this.money,
                withAssistant: this.withAssistant,
                type: this.type,
                chinese: this.chtType
            };
            this.$emit('getDetails', result);
        },
        checkIfHasAssistant() {
            if(this.hasAssistant) {
                this.withAssistant = !this.withAssistant;
            }else {
                alert('請先選擇助理');
            }
        }
    },
    computed: {
        hadleCheck() {
            if(!this.money || !this.hasAssistant) {
                return false;
            }else {
                return this.withAssistant;
            }
        }
    },
    watch: {
        money: 'sortDetails',
        withAssistant: 'sortDetails'
    }
}
</script>
