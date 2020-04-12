import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
export default {
    data() {
        return {
            noteList: [],
            getNoteToId: {}
        };
    },
    methods: {
        //Подключение к LocalStorage
        addConectionLowDb: function () {
            var adapter = new LocalStorage("noteDB");
            var notes = low(adapter);
            notes.defaults({ items: [] }).write();
            return notes;
        },
        //Выбираем заметку по id из LocalStorage
        getNoteToIdFn: function (id) {
            this.getNoteToId = this.addConectionLowDb()
                .get("items")
                .find({ id: id })
                .value()
        },
        //Удаление заметки из LocalStorage
        deleteNoteItem: function (id) {
            this.addConectionLowDb()
                .get("items")
                .remove({ id: id })
                .write();
            if (this.$route.path !== "/") {
                this.$router.push("/");
            }
            this.render();
        },
        //Вывод списка заметок из LocalStorage
        render: function () {
            this.noteList = this.addConectionLowDb()
                .get("items")
                .value();
        },
        //Добавление background до заметки на страниуе редактирования
        addBackgroundColor: function (color, opacity) {
            return {
                background: `rgba(${color},${opacity})`
            };
        },
        //Открытие модалки
        openModal: function (title, handler, targetId) {
            this.$modal({ title: title || '' }, handler, targetId).open();
        },
        //Закрытие модалки
        closeModal: function () {
            this.$modal().close();
        }
    }
};
