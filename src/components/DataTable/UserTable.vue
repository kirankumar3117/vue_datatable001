<template>
    <div class="MainTable">

        <div class="MenuBar">
            <div>
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="searchIcon"/>
                <input type="text" v-model="search" name="" placeholder="Search something" id="" class="inputForSearch">
            </div>
            <div>
                <button @click="handleDownload" v-if="data.length">
                    {{ data.length }} users Download
                </button>
            </div>
            <div>
                <button @click="handleRefresh">
                    refresh
                </button>
            </div>

        </div>

        <div class="table">
            <table>
                <tr class="tableHeaderName">
                    <th>Id</th>
                    <th class="stickyColumn01" id="filter" @click="handleNameFilter">Name <font-awesome-icon
                            icon="fa-solid fa-arrow-up-a-z" v-if="!namefilter" />
                        <font-awesome-icon icon="fa-solid fa-arrow-down-z-a" v-if="namefilter" />
                    </th>
                    <th>Mobile No</th>
                    <th id="filter" @click="handleCylinderFilter">No Of Cylinders <font-awesome-icon icon="fa-solid fa-arrow-up-1-9" v-if="!cylinderfilter" />
                        <font-awesome-icon icon="fa-solid fa-arrow-down-9-1" v-if="cylinderfilter"/>
                    </th>
                    <th>Amount</th>
                </tr>
                <div v-if="paginateddata.length == 0">
                    No data found
                </div>
                <tr v-for="el in paginateddata" :key="el.id" class="tableContent">
                    <td>
                        {{ el.id }}
                    </td>
                    <td :class="!data ? 'stickyColumn01 skeleton' : 'stickyColumn01'">
                        {{ el.first_name }}
                    </td>
                    <td>
                        {{ el.phone_number }}
                    </td>
                    <td>
                        {{ el.quantity }}
                    </td>
                    <td>
                        {{ el.total_amount }}
                    </td>
                </tr>
            </table>
        </div>

        <div class="width-100 center-row mt-20">
            <div class="PaginationMain">
                <button @click="Paginator(1)">
                    <font-awesome-icon icon="fa-solid fa-angles-left" />
                </button>
                <button @click="Paginator(currentpageno - 1)">
                    <font-awesome-icon icon="fa-solid fa-angle-left" />
                </button>
                <button v-for="no in pagesarray" :key="no" @click="Paginator(no)"
                    :id="currentpageno == no ? 'ActiveButton' : null">
                    {{ no }}
                </button>
                <button @click="Paginator(this.currentpageno + 1)">
                    <font-awesome-icon icon="fa-solid fa-angle-right" />
                </button>
                <button @click="Paginator(totalPaginationPages)">
                    <font-awesome-icon icon="fa-solid fa-angles-right" />
                </button>
            </div>
        </div>


    </div>
</template>

<script>
import axios from "axios";
import "./datatable.css";
export default {
    data() {
        return {
            data: [],
            namefilter: false,
            search: '',
            cylinderfilter: false,
            paginateddata: [],
            pagesarray: [],
            currentpageno: null
        }
    },
    watch: {
        search() {
            this.handleSearch();
        }
    },
    computed: {
        totalPaginationPages() {
            const total_pages = Math.ceil(this.data.length / 5);
            return total_pages;
        }
    },
    methods: {
        async handleSearch() {
            const res = await this.getData();
            const data = res.filter((e) => {
                return e.name.toLowerCase().includes(this.search.toLowerCase()) || e.phone_number.includes(this.search);
            })
            this.data = data;
            this.Paginator(1);
            this.setPaginationArray()
            console.log(this.data.length)
        },
        handleNameFilter() {
            if (!this.namefilter) {
                this.data.sort((a, b) => a.first_name.localeCompare(b.first_name))
                this.namefilter = true;
                this.Paginator()
            }
            else {
                this.data.sort((a, b) => b.first_name.localeCompare(a.first_name))
                this.namefilter = false;
                this.Paginator()
            }
        },
        handleCylinderFilter() {
            if (!this.cylinderfilter) {
                this.data.sort((a, b) => +a.quantity > +b.quantity ? 1 : -1)
                this.cylinderfilter = true;
                this.Paginator()
            }
            else {
                this.data.sort((a, b) => +a.quantity < +b.quantity ? 1 : -1)
                this.cylinderfilter = false;
                this.Paginator()
            }
        },
        async getData() {
            const data = await axios.get('http://localhost:8000/userdata');
            const res = await data.data
            return res
        },
        async setData() {
            const res = await this.getData();
            this.data = res;
        },
        async handleRefresh() {
            await this.setData();
            this.Paginator();
            this.setPaginationArray();
            this.search = ''
            this.namefilter = false;
            this.cylinderfilter = false;
        },
        handleDownload() {
            let filename = 'userdata.csv';
            const header = {
                id: 'ID',
                first_name: "First Name",
                name: "Name",
                date_of_birth: "Date Of Birth",
                gender: "Gender",
                ip_address: "IP Address",
                card_expiry: "Card Expiry",
                card: "Card Number",
                card_type: "Card Type",
                quantity: "Cylinder Quantity",
                phone_number: "Phone Number",
                total_amount: "Total Amount"
            }
            this.data.unshift(header)
            var jsonObject = JSON.stringify(this.data);
            var csv = this.convertToCSV(jsonObject);

            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
            element.setAttribute('download', filename);
            this.setData();

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();
            document.body.removeChild(element);
        },
        convertToCSV(objArray) {

            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';

            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','

                    line += array[i][index];
                }

                str += line + '\r\n';
            }

            return str;

        },
        Paginator(pageno) {
            if (pageno > Math.ceil(this.data.length / 5)) {
                return
            }
            pageno ? this.currentpageno = pageno : this.currentpageno = 1;
            let page = pageno || 1,
                per_page = 5,
                offset = (page - 1) * 5;
            pageno ? this.setPaginationArray(this.currentpageno) : this.setPaginationArray();
            // two parameters current page no and total no of pages
            let paginatedItems = this.data?.slice(offset).slice(0, per_page);
            this.paginateddata = paginatedItems
        },
        setPaginationArray(val) {
            const total_pages = Math.ceil(this.data.length / 5);
            let arr = [];
            var start = this.pagesarray[0];
            var end = this.pagesarray[this.pagesarray.length - 1];
            if (!val || val < this.pagesarray.length) {
                for (var i = 1; i <= (this.pagesarray.length || 7); i++) {
                    if (i < total_pages) {
                        arr.push(i)
                    }
                }
                this.pagesarray = arr;
                arr = []
            }
            else if (val == total_pages) {
                for (i = total_pages; i > total_pages - this.pagesarray.length; i--) {
                    arr.push(i);
                }
                this.pagesarray = arr.reverse();
                arr = []
                return
            }
            else if (val) {
                if (end == val && end != total_pages && end < total_pages) {
                    for (i = end; i < end + (end - start + 1); i++) {
                        if (i <= total_pages) {
                            arr.push(i);
                        }
                    }
                    this.pagesarray = arr;
                    arr = []
                }
                else if (val == start) {
                    for (i = start; i > start - this.pagesarray.length; i--) {
                        if (i >= 1) {
                            arr.push(i);
                        }
                    }
                    this.pagesarray = arr.reverse();
                    arr = []
                }

            }
        }

    },
    async created() {
        await this.setData();
        this.Paginator();
        this.setPaginationArray()
    }

}
</script>

<style scoped>
.MainTable {
    min-width: 50%;
    max-width: max-content;
    height: 600px;
    overflow: auto;
    gap: 35px;
}

.MainTable td {
    text-align: center;
}

.stickyColumn01 {
    position: -webkit-sticky;
    position: sticky;
    left: 0
}

.table {
    width: 100%;
    position: sticky;
    overflow: auto;

}

.table>table {
    table-layout: fixed;
    width: 1000px;
    font-size: 20px;
    font-family: sans-serif;
    border: 0px 1px solid rgb(232, 230, 230);
}

.table>table td {
    border: 1px solid rgb(232, 230, 230);
    background-color: white;
}

.skeleton {
    opacity: .7;
    animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
    0% {
        background-color: hsl(200, 20%, 70%);
    }

    100% {
        background-color: hsl(200, 20%, 95%);
    }

}
</style>