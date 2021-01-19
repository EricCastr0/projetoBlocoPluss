const app = new Vue({
    el: '#app',
    data: function () {
        return {
            notes: [],
            active: null
        }
    },
    methods: {
        create: function () {
            this.active = null
            this.$refs.textarea.value = '';
        },
        select(key) {
            this.active = key;
            this.$refs.textarea.value = this.notes[key].content;
        },
        save: _.debounce(function () {
            let data = this.$refs.textarea.value;
            let notes = window.localStorage.getItem('notes') || '[]';
            notes = JSON.parse(notes);

            if (this.active == null) {
                notes.splice(0, 0, {
                    content: data
                })
            } else {
                notes[this.active].content = data;
            }

            if (data == '') {
                this.active = null;
            }

            this.notes = [];
            notes.forEach((e) => {
                //console.log(e);
                if (e.content != '') {
                    this.notes.push(e);
                }
            });

            if (this.notes.length > 0 && this.active === null) {
                this.select(0);
            }

            window.localStorage.setItem('notes', JSON.stringify(this.notes));

        }, 300)
    },
    mounted: function () {
        let notes = window.localStorage.getItem('notes') || '[]';
        this.notes = JSON.parse(notes);
        if (this.notes.length > 0) {
            this.select(0);
        }
    }

});