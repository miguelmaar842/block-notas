import { createStore } from 'vuex';
import { db } from '@/firebase';
import { addDoc, collection, query, getDocs, doc, deleteDoc, where } from "firebase/firestore";

export default createStore({
  state: {
    usuario: null,
    notas: []
  },
  getters: {
    usuarioAutenticado(state) {
      return !!state.usuario;
    }
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setFindNota(state, payload) {
      state.notaFind = payload;
    },
    setNotas(state, payload) {
      state.notas = payload;
    },
    addNota(state, payload) {
      state.notas.push(payload);
    },
    removeNota(state, payload) {
      state.notas = state.notas.filter(s => s.id !== payload);
    }
  },
  actions: {
    setUsuario({ commit }, user) {
      const usuario = {
        email: user.email,
        uid: user.uid,
        foto: user.photoURL
      };
      commit('setUsuario', usuario);
    },
    cerrarSesion({ commit }) {
      commit('setUsuario', null);
    },
    async obtieneNotas({ commit, state }) {
      try {
        const queryNotas = query(collection(db, 'notas'), where("uid", "==", state.usuario.uid));
        const querySnapshot = await getDocs(queryNotas);
        let listNotas = [];
        querySnapshot.forEach((doc) => {
          let dataNota = doc.data();
          dataNota.id = doc.id;
          listNotas.push(dataNota);
        });
        commit('setNotas', listNotas);
        return {
          res: true,
          error: ''
        };
      } catch (error) {
        return {
          res: false,
          error: error
        };
      }
    },
    async agregarNota({ commit, state }, notaAdd) {
      try {
        let newDoc = {
          titulo: notaAdd.titulo,
          texto: notaAdd.texto,
          uid: state.usuario.uid
        };
        const resNota = await addDoc(collection(db, "notas"), newDoc);
        newDoc.id = resNota.id;
        commit('addNota', notaAdd);
        return {
          res: true,
          error: ''
        };
      } catch (error) {
        return {
          res: false,
          error: error
        };
      }
    },
    async eliminarNota({ commit }, idNota) {
      try {
        await deleteDoc(doc(db, "notas", idNota));
        commit('removeNota', idNota);
        return {
          res: true,
          error: ''
        };
      } catch (error) {
        return {
          res: false,
          error: error
        };
      }
    }
  },
  modules: {
  }
})
