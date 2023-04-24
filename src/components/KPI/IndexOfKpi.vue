<template>
    <div class="KpiBox">
        <br/>
        <div class="content">
            <div>
                {{ text || 'Content' }}
            </div>
            <div class="flex" style="gap:10px;margin-left: 10%;">
                <div class="relative top-5">
                    <font-awesome-icon icon="fa-solid fa-sort-down" class="sortIcon" style="color:red" v-if="value<0"/>
                    <font-awesome-icon icon="fa-solid fa-sort-up" class="sortIcon" style="color:green" v-if="value>0"/>
                </div>
                <div>
                    {{ value }}
                </div>
            </div>
        </div>
        <br/>
    </div>
</template>

<script>
import "./kpi.css"
export default{
    props:{
        text:String,
        value:Number
    }
}
</script>

<style scoped>
.KpiBox{
    width:max-content;
    /* border: 1px solid red; */
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
.content{
    margin:0px 20px;
    font-weight: 500;
    font-size: 20px;
}
.sortIcon{
    font-size: 25px;
}
</style>