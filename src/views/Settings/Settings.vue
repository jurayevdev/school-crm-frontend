<template>
  <div class="px-2 mt-4">
    <div v-show="!store.PageProduct">
      <Placeholder2 />
    </div>

    <section v-show="store.PageProduct" class="">
      <div class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 gap-3 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <h1 class="text-blue-700 font-bold text-lg w-full">Sozlamalar</h1>
          <div
            class="lg:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-4"
            :class="navbar.userNav ? 'text-white' : 'text-black'"
          >
            <button
              @click="toggleGeneralSettings()"
              id=""
              type="button"
              :class="
                generalSettings
                  ? 'btnAdd flex items-center max-w-fit justify-center whitespace-nowrap border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
                  : 'flex items-center max-w-fit justify-center whitespace-nowrap bg-transparent border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
              "
            >
              <span class="">Asosiy sozlama</span>
            </button>
            <button
              @click="togglePasswordChange()"
              id=""
              type="button"
              :class="
                passwordChange
                  ? 'btnAdd flex items-center max-w-fit justify-center whitespace-nowrap border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
                  : 'flex items-center max-w-fit justify-center whitespace-nowrap bg-transparent border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
              "
            >
              <span class="">Parolni yangilash</span>
            </button>
            <button
              v-show="store.guard"
              @click="toggleSocialLink()"
              id=""
              type="button"
              :class="
                socialLink
                  ? 'btnAdd flex items-center max-w-fit justify-center whitespace-nowrap border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
                  : 'flex items-center max-w-fit justify-center whitespace-nowrap bg-transparent border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
              "
            >
              <span class="">Ijtimoiy tarmoqlar</span>
            </button>
            <button
              v-show="store.guard"
              @click="togglePaymentMethod()"
              id=""
              type="button"
              :class="
                paymentMethod
                  ? 'btnAdd flex items-center max-w-fit justify-center whitespace-nowrap border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
                  : 'flex items-center max-w-fit justify-center whitespace-nowrap bg-transparent border border-[#2f73f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
              "
            >
              <span class="">To'lov turlari</span>
            </button>
          </div>
        </div>
      </div>

      <div class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="shadow rounded-xl flex flex-col justify-between p-4 gap-3 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <!----------------------------------------- User settings ------------------------------------>

          <div :class="generalSettings ? 'relative w-full h-auto' : 'hidden'">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
              >
                <h3
                  class="text-lg font-bold"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Foydalanuvchi sozlamalari
                </h3>
              </div>
              <!-- Modal body -->
              <form
                @submit.prevent="getOneProduct"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid font-medium gap-4 mb-4 sm:grid-cols-3">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >To'liq ismi (I . F . O)</label
                    >
                    <input
                      v-model="edit.full_name"
                      type="text"
                      name="name"
                      id="name"
                      class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="To'liq ismini kiriting"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="phone"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Telefon raqami</label
                    >
                    <input
                      v-model="edit.phone_number"
                      type="tel"
                      name="phone"
                      id="phone"
                      class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="Telefon raqamini kiriting"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="login"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Login</label
                    >
                    <input
                      v-model="edit.login"
                      type="text"
                      name="login"
                      id="login"
                      class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder="login"
                      required
                    />
                  </div>
                </div>
                <div
                  class="w-full flex items-center justify-end border-t pt-5 mt-5"
                >
                  <button
                    type="submit"
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    O'zgartirish
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!----------------------------------------- Password change ---------------------------------->

          <div :class="passwordChange ? 'relative w-full h-auto' : 'hidden'">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
              >
                <h3
                  class="text-lg font-bold"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Parolni o'zgartirish
                </h3>
              </div>
              <!-- Modal body -->
              <form @submit.prevent="" :class="{ darkForm: navbar.userNav }">
                <div class="grid font-medium gap-4 mb-4 sm:grid-cols-3">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Joriy parol</label
                    >
                    <input
                      v-model="edit.password"
                      type="password"
                      name="name"
                      id="name"
                      class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder=""
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="phone"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Yangi parol</label
                    >
                    <input
                      v-model="edit.newPassword"
                      type="password"
                      name="phone"
                      id="phone"
                      class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      placeholder=""
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="login"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Yangi parolni tasdiqlang</label
                    >
                    <input
                      v-model="edit.confirmNewPassword"
                      type="password"
                      name="login"
                      id="login"
                      class="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    />
                  </div>
                </div>
                <div
                  class="w-full flex items-center justify-end border-t pt-5 mt-5"
                >
                  <button
                    type="submit"
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    O'zgartirish
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!----------------------------------------- Social Link -------------------------------------->

          <!-- <div
        v-show="modal"
        :class="
          modal
            ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <div class="relative p-4 w-full max-w-lg h-auto">
         
          <div
            class="relative p-4 rounded-lg shadow sm:p-5"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            
            <div
              class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
            >
              <h3
                class="text-lg"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
              >
                Yangi link qo'shish
              </h3>
              <button
                @click="toggleModal"
                type="button"
                class="bg-transparent hover:bg-gray-200 hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                :class="{ 'text-white': navbar.userNav }"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
 
            <form @submit.prevent="" :class="{ darkForm: navbar.userNav }">
              <div class="grid font-medium gap-4 mb-4 grid-cols-1">
                <div>
                  <label for="name" class="block mb-2 text-sm">Nomi</label>
                  <input
                    v-model="form.title"
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="Nomini kiriting"
                  />
                </div>
              </div>
              <div
                class="w-full flex items-center justify-between border-t pt-5 mt-5"
              >
                <button
                  @click="toggleModal"
                  type="button"
                  class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> -->

          <!-- ----------------------------------------- Delete modal ---------------------------------------------------- -->
          <!-- <div
        :class="
          remove.toggle
            ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <div class="relative p-4 max-w-5xl min-w-[30%] h-auto">
         
          <div
            class="relative p-4 rounded-lg shadow sm:p-5"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            
            <div
              class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
            >
              <h3
                class="text-lg"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
              >
                Linkni o'chirib tashlash
              </h3>
              <button
                @click="remove.toggle = false"
                type="button"
                class="bg-transparent hover:bg-gray-200 hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
           
            <div :class="{ darkForm: navbar.userNav }">
              <div class="grid font-medium gap-4 mb-4 grid-cols-1">
                <div>
                  <div></div>
                  <h1
                    class="text-2xl"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Siz linkni o'chirishni xohlaysizmi?
                  </h1>
                </div>
                <div
                  class="w-full flex items-center justify-between border-t pt-5 mt-5"
                >
                  <button
                    @click="remove.toggle = false"
                    type="button"
                    class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    @click="deleteProduct"
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
          <!-- ----------------------------------------- delete modal end ---------------------------------------------------- -->

          <!-- <div :class="socialLink ? 'p-4 sm:p-5' : 'hidden'">
        <div
          class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
        >
          <h3
            class="text-lg font-bold"
            :class="navbar.userNav ? 'text-white' : 'text-black'"
          >
            Ijtimoiy tarmoqlar
          </h3>
          <div
            class="lg:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3"
          >
            <button
              @click="toggleModal"
              id=""
              type="button"
              class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 sm:py-2"
            >
              <span class="sm:block hidden">Link qo'shish</span>
              <i class="sm:hidden block bx bxs-user-plus text-lg"></i>
            </button>
          </div>
        </div>
        <div
          class="relative border rounded-lg overflow-hidden"
          :class="
            navbar.userNav
              ? 'bg-[#1e293b] border-gray-700 text-white'
              : 'bg-white'
          "
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs rounded-lg uppercase bg-[#4141eb]">
                <tr>
                  <th
                    scope="col"
                    class="text-center py-3 whitespace-nowrap text-white"
                  >
                    Nomi
                  </th>
                  <th scope="col" class="text-center py-3 text-white">
                    O'chirish
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class=""
                  :class="
                    navbar.userNav
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-3 font-medium whitespace-nowrap"
                  >
                    <span>Instagram</span>
                  </th>
                  <td class="text-center whitespace-nowrap font-medium">
                    <i
                      @click="deleteFunc(1)"
                      class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg px-5 py-2 focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> -->

          <!-------------------------------------------- Payment Method --------------------------------------------------------->

          <!-- <div
        v-show="modalPayment"
        :class="
          modalPayment
            ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <div class="relative p-4 w-full max-w-lg h-auto">
         
          <div
            class="relative p-4 rounded-lg shadow sm:p-5"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
           
            <div
              class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
            >
              <h3
                class="text-lg"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
              >
                Yangi to'lov turini qo'shish
              </h3>
              <button
                @click="toggleModalPayment"
                type="button"
                class="bg-transparent hover:bg-gray-200 hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                :class="{ 'text-white': navbar.userNav }"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
           
            <form
              @submit.prevent="createProduct"
              :class="{ darkForm: navbar.userNav }"
            >
              <div class="grid font-medium gap-4 mb-4 grid-cols-1">
                <div>
                  <label for="name" class="block mb-2 text-sm">Nomi</label>
                  <input
                    v-model="form.title"
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="Nomini kiriting"
                  />
                </div>
              </div>
              <div
                class="w-full flex items-center justify-between border-t pt-5 mt-5"
              >
                <button
                  @click="toggleModal"
                  type="button"
                  class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> -->

          <!-- ----------------------------------------- Delete modal ---------------------------------------------------- -->
          <!-- <div
        :class="
          remove.payment
            ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <div class="relative p-4 max-w-5xl min-w-[30%] h-auto">
          
          <div
            class="relative p-4 rounded-lg shadow sm:p-5"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            
            <div
              class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
            >
              <h3
                class="text-lg"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
              >
                To'lov turini o'chirib tashlash
              </h3>
              <button
                @click="remove.payment = false"
                type="button"
                class="bg-transparent hover:bg-gray-200 hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          
            <div :class="{ darkForm: navbar.userNav }">
              <div class="grid font-medium gap-4 mb-4 grid-cols-1">
                <div>
                  <div></div>
                  <h1
                    class="text-2xl"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Siz to'lov turini o'chirishni xohlaysizmi?
                  </h1>
                </div>
                <div
                  class="w-full flex items-center justify-between border-t pt-5 mt-5"
                >
                  <button
                    @click="remove.payment = false"
                    type="button"
                    class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
          <!-- ----------------------------------------- delete modal end ---------------------------------------------------- -->

          <!-- <div :class="paymentMethod ? 'p-4 sm:p-5' : 'hidden'">
        <div
          class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
        >
          <h3
            class="text-lg font-bold"
            :class="navbar.userNav ? 'text-white' : 'text-black'"
          >
            To'lov turlari
          </h3>
          <div
            class="lg:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3"
          >
            <button
              v-show="!store.guard"
              @click="toggleModalPayment"
              id=""
              type="button"
              class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 sm:py-2"
            >
              <span class="sm:block hidden">To'lov turi qo'shish</span>
              <i class="sm:hidden block bx bxs-user-plus text-lg"></i>
            </button>
          </div>
        </div>
        <div
          class="relative border rounded-lg overflow-hidden"
          :class="
            navbar.userNav
              ? 'bg-[#1e293b] border-gray-700 text-white'
              : 'bg-white'
          "
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="text-xs rounded-lg uppercase bg-[#4141eb]">
                <tr>
                  <th
                    scope="col"
                    class="text-center py-3 whitespace-nowrap text-white"
                  >
                    Nomi
                  </th>
                  <th scope="col" class="text-center py-3 text-white">
                    O'chirish
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class=""
                  :class="
                    navbar.userNav
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-3 font-medium whitespace-nowrap"
                  >
                    <span>Instagram</span>
                  </th>
                  <td class="text-center whitespace-nowrap font-medium">
                    <i
                      @click="deleteFuncPay(1)"
                      class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg px-5 py-2 focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";
import { Placeholder2 } from "../../components";

const notification = useNotificationStore();
const navbar = useNavStore();
// const router = useRouter();

const generalSettings = ref(true);
const toggleGeneralSettings = () => {
  generalSettings.value = true;
  passwordChange.value = false;
  socialLink.value = false;
  paymentMethod.value = false;
};

const passwordChange = ref(false);
const togglePasswordChange = () => {
  passwordChange.value = true;
  generalSettings.value = false;
  socialLink.value = false;
  paymentMethod.value = false;
};

const socialLink = ref(false);
const toggleSocialLink = () => {
  socialLink.value = true;
  generalSettings.value = false;
  passwordChange.value = false;
  paymentMethod.value = false;
};

const paymentMethod = ref(false);
const togglePaymentMethod = () => {
  paymentMethod.value = true;
  generalSettings.value = false;
  passwordChange.value = false;
  socialLink.value = false;
};

const store = reactive({
  PageProduct: "",
  guard: false,
});

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

function deleteFuncPay(id) {
  remove.id = id;
  remove.payment = true;
}

// ----------------------------------- forms -----------------------------------

const edit = reactive({
  full_name: "",
  phone_number: "",
  login: "",
  password: "",
  newPassword: "",
  confirmNewPassword: "",
});

const remove = reactive({
  id: "",
  toggle: false,
  payment: false,
});

// ----------------------------------- axios --------------------------------

const getOneProduct = () => {
  if (localStorage.getItem("role") == "administrator") {
    axios
      .get(
        `/employee/${localStorage.getItem("school_id")}/${localStorage.getItem(
          "id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        store.PageProduct = res.data;
        edit.full_name = res.data.full_name;
        edit.phone_number = res.data.phone_number;
        edit.login = res.data.login;
        edit.password = res.data.password;
        edit.id = id;
      })
      .catch((error) => {
        notification.warning(error.response.data.message);
        console.log("error", error);
      });
  } else {
    axios
      .get(`/user/${localStorage.getItem("id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        store.PageProduct = res.data;
        edit.full_name = res.data.full_name;
        edit.phone_number = res.data.phone_number;
        edit.login = res.data.login;
        edit.password = res.data.password;
      })
      .catch((error) => {
        notification.warning(error.response.data.message);
        console.log("error", error);
      });
  }
};

const getGuard = () => {
  if (localStorage.getItem("role") == "administrator") {
    store.guard = true;
  }
};

onMounted(() => {
  getGuard();
  getOneProduct();
});
</script>

<style lang="scss" scoped>
.btnAdd {
  background-image: linear-gradient(to right, white -450%, #4141eb);
  color: white;
}

.darkForm {
  label {
    color: white;
  }
}

// #056674
</style>
