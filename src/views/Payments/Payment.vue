<template>
  <div @click="store.filter_show = false" class="px-2">
    <!-- ----------------------------------------- EMPLYE TABLE  ------------------------------------------------- -->

    <section class="pt-4">
      <!------------------------------------------- Search ------------------------------------------->
      <div v-show="!store.PageProduct">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Search ------------------------------------------->

      <!-- ----------------------------------------- Delete modal ---------------------------------------------------- -->
      <div
        :class="
          remove.toggle
            ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <div class="relative p-4 max-w-5xl min-w-[30%] h-auto">
          <!-- Modal content -->
          <div
            class="relative p-4 rounded-lg shadow sm:p-5"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <!-- Modal header -->
            <div
              class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
            >
              <h3
                class="text-lg"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
              >
                To'lovni o'chirib tashlash
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
            <!-- Modal body -->
            <div :class="{ darkForm: navbar.userNav }">
              <div class="grid font-medium gap-4 mb-4 grid-cols-1">
                <div>
                  <div></div>
                  <h1
                    class="text-2xl"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    Siz to'lovni o'chirishni xohlaysizmi?
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
                    class="btnAdd cursor-pointer text-white inline-flex items-center bg-[#4141eb] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ----------------------------------------- delete modal end ---------------------------------------------------- -->

      <!-- ------------------------------------------ Edit modal --------------------------------------------------------- -->
      <div
        @click.self="cenecleEdit"
        :class="
          edit.modal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div class="relative p-4 w-full max-w-3xl h-auto">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
              >
                <h3
                  class="text-lg"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  To'lov qilish
                </h3>
                <button
                  @click="cenecleEdit"
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
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div
                class="hidden sm:block max-w-xs mx-auto bg-white shadow-lg rounded-lg p-3 mb-5"
                id="receipt"
              >
                <div class="mb-5 mt-3 flex items-center justify-center gap-1.5">
                  <img
                    class="w-10 rounded-full"
                    :src="store.logo_link + store.school_logo"
                    alt=""
                  />
                  <h2 class="text-xl font-bold uppercase">
                    {{ store.school_name }}
                  </h2>
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">To'lov turi:</span>
                  <span id="paymentType">{{ form.method }}</span>
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">Talaba:</span>
                  <span id="studentName">{{ store.student_name }}</span>
                </div>
                <div
                  class="item flex justify-between gap-10 border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">Guruh nomi:</span>
                  <span id="group" class="text-end">{{
                    store.group_name
                  }}</span>
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">Kurs narxi:</span>
                  <span id="coursePrice">{{ store.price }} so'm</span>
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">Ustoz:</span>
                  <span id="teacher">{{ store.teacher_name }}</span>
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">Oy:</span>
                  <span id="date" class="font-bold text-xs">{{
                    monthNames(form.month)
                  }}</span>
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">To'lov:</span>
                  <span id="amount" class="font-bold text-xs"
                    >{{ form.price }} so'm</span
                  >
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">Sana:</span>
                  <span id="date">{{ store.chekDate }}</span>
                </div>
                <div
                  class="item flex justify-center border-b border-dashed border-black py-1 text-sm text-center"
                >
                  <span
                    >IT ni it deb o'qima, <br />
                    Ingliz tili va AyTi ni
                    <span class="font-bold uppercase">{{
                      store.school_name
                    }}</span>
                    da o'rgan!
                  </span>
                </div>
                <div
                  class="flex items-center justify-end gap-0.5 text-[4px] mt-5"
                >
                  <span class="flex flex-col items-end"
                    >Devosoft Group<span class="text-[2.5px]"
                      >+998330237376</span
                    ></span
                  >
                </div>
              </div>

              <!-- Modal body -->
              <form
                @submit.prevent="editProduct"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid font-medium gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label for="year" class="block mb-2 text-sm"
                      >Yilni tanlang</label
                    >
                    <select
                      v-model="form.year"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option
                        v-for="i in store.curentYil"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="month" class="block mb-2 text-sm"
                      >Oyni tanlang</label
                    >
                    <select
                      v-model="form.month"
                      id="month"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Oyni tanlang</option>
                      <option value="01">Yanvar</option>
                      <option value="02">Fevral</option>
                      <option value="03">Mart</option>
                      <option value="04">Aprel</option>
                      <option value="05">May</option>
                      <option value="06">Iyun</option>
                      <option value="07">Iyul</option>
                      <option value="08">Avgust</option>
                      <option value="09">Sentabr</option>
                      <option value="10">Oktabr</option>
                      <option value="11">Noyabr</option>
                      <option value="12">Dekabr</option>
                    </select>
                  </div>
                  <div class="">
                    <label for="price" class="block mb-2 text-sm">Price</label>
                    <input
                      v-model="form.price"
                      type="number"
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
                      placeholder="To'lov sumani kiriting"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >To'lov turi tanlang</label
                    >
                    <select
                      v-model="form.method"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>
                        To'lov turini tanlang
                      </option>
                      <option
                        v-for="i in store.method"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  class="w-full flex items-center justify-between border-t pt-5 mt-5"
                >
                  <button
                    @click="cenecleEdit"
                    type="button"
                    class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    O'zgartirish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
      <!-- ------------------------------------------ edit modal end ----------------------------------------------------- -->

      <!-- ------------------------------------------ Add modal -------------------------------------------------------- -->
      <div
        v-show="modal"
        @click.self="toggleModal"
        :class="
          modal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div v-show="modal" class="relative p-4 w-full max-w-3xl h-auto">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
              >
                <h3
                  class="text-lg"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  To'lov qilish
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
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div
                class="hidden sm:block max-w-xs mx-auto bg-white shadow-lg rounded-lg p-3 mb-5"
                id="receipt"
              >
                <div class="mb-5 mt-3 flex items-center justify-center gap-1.5">
                  <img
                    class="w-10 rounded-full"
                    :src="store.logo_link + store.school_logo"
                    alt=""
                  />
                  <h2 class="text-xl font-bold uppercase">
                    {{ store.school_name }}
                  </h2>
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">To'lov turi:</span>
                  <span id="paymentType">{{ form.method }}</span>
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">Talaba:</span>
                  <span id="studentName">{{ store.student_name }}</span>
                </div>
                <div
                  class="item flex justify-between gap-10 border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">Guruh nomi:</span>
                  <span id="group" class="text-end">{{
                    store.group_name
                  }}</span>
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">Kurs narxi:</span>
                  <span id="coursePrice">{{ store.price }} so'm</span>
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">Ustoz:</span>
                  <span id="teacher">{{ store.teacher_name }}</span>
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">Oy:</span>
                  <span id="date" class="font-bold text-xs">{{
                    monthNames(form.month)
                  }}</span>
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">To'lov:</span>
                  <span id="amount" class="font-bold text-xs"
                    >{{ form.price }} so'm</span
                  >
                </div>
                <div
                  class="item flex justify-between border-b border-dashed border-black py-1 text-sm"
                >
                  <span class="font-semibold">Sana:</span>
                  <span id="date">{{ store.chekDate }}</span>
                </div>
                <div
                  class="item flex justify-center border-b border-dashed border-black py-1 text-sm text-center"
                >
                  <span
                    >IT ni it deb o'qima, <br />
                    Ingliz tili va AyTi ni
                    <span class="font-bold uppercase">{{
                      store.school_name
                    }}</span>
                    da o'rgan!
                  </span>
                </div>
                <div
                  class="flex items-center justify-end gap-0.5 text-[4px] mt-5"
                >
                  <span class="flex flex-col items-end"
                    >Devosoft Group<span class="text-[2.5px]"
                      >+998330237376</span
                    ></span
                  >
                </div>
              </div>

              <!-- Modal body -->
              <form
                @submit.prevent="addPayment"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid font-medium gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label for="year" class="block mb-2 text-sm"
                      >Yilni tanlang</label
                    >
                    <select
                      v-model="form.year"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option
                        v-for="i in store.curentYil"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="month" class="block mb-2 text-sm"
                      >Oyni tanlang</label
                    >
                    <select
                      v-model="form.month"
                      id="month"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Oyni tanlang</option>
                      <option value="01">Yanvar</option>
                      <option value="02">Fevral</option>
                      <option value="03">Mart</option>
                      <option value="04">Aprel</option>
                      <option value="05">May</option>
                      <option value="06">Iyun</option>
                      <option value="07">Iyul</option>
                      <option value="08">Avgust</option>
                      <option value="09">Sentabr</option>
                      <option value="10">Oktabr</option>
                      <option value="11">Noyabr</option>
                      <option value="12">Dekabr</option>
                    </select>
                  </div>
                  <div class="">
                    <label for="price" class="block mb-2 text-sm">Price</label>
                    <input
                      v-model="form.price"
                      type="number"
                      name="price"
                      id="price"
                      class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
                      placeholder="To'lov sumani kiriting"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >To'lov turi tanlang</label
                    >
                    <select
                      v-model="form.method"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>
                        To'lov turini tanlang
                      </option>
                      <option
                        v-for="i in store.method"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
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
                    To'lash
                  </button>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
      <!-- ------------------------------------------- add modal end ----------------------------------------------------- -->

      <!-- ------------------------------------------- history modal ----------------------------------------------------- -->
      <div
        @click.self="historyModal"
        :class="
          history.modal
            ? 'fixed overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <transition name="modal-fade">
          <div class="relative p-4 w-full max-w-xl h-auto">
            <!-- Modal content -->
            <div
              class="relative p-4 rounded-lg shadow sm:p-5"
              :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
            >
              <!-- Modal header -->
              <div
                class="flex flex-col items-center gap-5 pb-4 mb-4 rounded-t border-b sm:mb-5"
              >
                <div class="flex items-center justify-between w-full">
                  <h3
                    class="text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                  >
                    To'lov tarixini ko'rish
                  </h3>
                  <button
                    @click="historyModal"
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
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div
                  class="flex items-center justify-between w-auto"
                  id="navbar-sticky"
                >
                  <ul class="font-medium flex items-center gap-5 text-white">
                    <li
                      class="cursor-pointer bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-lg"
                      :class="history.dayModal ? 'btnAdd' : 'bg-gray-600'"
                      @click="historyDayModal"
                    >
                      <span>Kun bo'yicha ko'rish</span>
                    </li>
                    <li
                      class="cursor-pointer bg-gray-600 hover:bg-gray-500 p-2 px-5 sm:text-md text-sm rounded-lg"
                      :class="history.monthModal ? 'btnAdd' : 'bg-gray-600'"
                      @click="historyMonthModal"
                    >
                      <span>Oy bo'yicha ko'rish</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Modal body -->
              <form
                v-show="history.dayModal"
                @submit.prevent="getHistory(store.pagination)"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid font-medium gap-4 mb-4">
                  <div>
                    <label for="year" class="block mb-2 text-sm"
                      >Yilni tanlang</label
                    >
                    <select
                      v-model="history.year"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option
                        v-for="i in store.curentYil"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="month" class="block mb-2 text-sm"
                      >Oyni tanlang</label
                    >
                    <select
                      v-model="history.month"
                      id="month"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Oyni tanlang</option>
                      <option value="01">Yanvar</option>
                      <option value="02">Fevral</option>
                      <option value="03">Mart</option>
                      <option value="04">Aprel</option>
                      <option value="05">May</option>
                      <option value="06">Iyun</option>
                      <option value="07">Iyul</option>
                      <option value="08">Avgust</option>
                      <option value="09">Sentabr</option>
                      <option value="10">Oktabr</option>
                      <option value="11">Noyabr</option>
                      <option value="12">Dekabr</option>
                    </select>
                  </div>
                  <div>
                    <label for="day" class="block mb-2 text-sm"
                      >Kuni kiriting</label
                    >
                    <input
                      v-model="history.day"
                      id="day"
                      type="number"
                      class="bg-white border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-2.5 pl-3"
                      placeholder="Kuni kiriting.."
                      min="1"
                      max="31"
                      required
                    />
                  </div>
                </div>
                <div
                  class="w-full flex items-center justify-between border-t pt-5 mt-5"
                >
                  <button
                    @click="historyModal"
                    type="button"
                    class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Ko'rish
                  </button>
                </div>
              </form>
              <form
                v-show="history.monthModal"
                @submit.prevent="getHistory(store.pagination)"
                :class="{ darkForm: navbar.userNav }"
              >
                <div class="grid font-medium gap-4 mb-4">
                  <div>
                    <label for="year" class="block mb-2 text-sm"
                      >Yilni tanlang</label
                    >
                    <select
                      v-model="history.year"
                      id="name"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Yilni tanlang</option>
                      <option
                        v-for="i in store.curentYil"
                        :key="i.id"
                        :value="i.name"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label for="month" class="block mb-2 text-sm"
                      >Oyni tanlang</label
                    >
                    <select
                      v-model="history.month"
                      id="month"
                      class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Oyni tanlang</option>
                      <option value="01">Yanvar</option>
                      <option value="02">Fevral</option>
                      <option value="03">Mart</option>
                      <option value="04">Aprel</option>
                      <option value="05">May</option>
                      <option value="06">Iyun</option>
                      <option value="07">Iyul</option>
                      <option value="08">Avgust</option>
                      <option value="09">Sentabr</option>
                      <option value="10">Oktabr</option>
                      <option value="11">Noyabr</option>
                      <option value="12">Dekabr</option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm"
                      :class="navbar.userNav ? 'text-white' : 'text-black'"
                      >Guruhni tanlang</label
                    >
                    <select
                      v-model="history.group_id"
                      id="name"
                      class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                      required
                    >
                      <option value="" disabled selected>Guruh tanlang</option>
                      <option
                        v-for="i in store.group"
                        :key="i.id"
                        :value="i.id"
                      >
                        {{ i.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  class="w-full flex items-center justify-between border-t pt-5 mt-5"
                >
                  <button
                    @click="historyModal"
                    type="button"
                    class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Ko'rish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
      <!-- ------------------------------------------- history modal end ------------------------------------------------- -->

      <div v-show="store.PageProduct" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 gap-3 mb-3"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div
            class="w-full flex items-center sm:justify-start lg:pb-0 pb-4 justify-between gap-5"
          >
            <h1 class="text-blue-700 font-bold text-lg">To'lov</h1>
            <div
              class="lg:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3"
            >
              <button
                @click="history.modal = true"
                type="button"
                class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
              >
                <span class="">To'lov tarixi</span>
              </button>
            </div>
          </div>

          <div class="w-full flex items-center lg:pb-0 pb-2 gap-5">
            <form
              @submit.prevent="getOneProduct(form.group_id)"
              :class="{ darkForm: navbar.userNav }"
              class="w-full flex sm:flex-row flex-col items-center justify-end gap-5"
            >
              <select
                v-model="form.group_id"
                id="name"
                class="bg-white border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-1.5 pl-3"
              >
                <option value="" disabled selected>Guruhni tanlang</option>
                <option v-for="i in store.group" :key="i.id" :value="i.id">
                  {{ i.name }}
                </option>
              </select>

              <div
                class="sm:max-w-fit w-full flex flex-row md:space-y-0 items-center justify-between md:justify-end md:space-x-3"
              >
                <button
                  id=""
                  type="submit"
                  class="btnAdd flex items-center sm:max-w-fit w-full justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
                >
                  <span class="">To'lov qilish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <h2
          v-show="history.dayModal"
          class="text-gray-600 font-bold sm:text-md text-sm pl-4 pb-2"
        >
          Kunlik to'lov tarixi - {{ history.year }}/{{ history.month }}/{{
            history.day
          }}
        </h2>
        <h2
          v-show="history.monthModal"
          class="text-gray-600 font-bold sm:text-md text-sm pl-4 pb-2"
        >
          Guruhni oylik to'lov tarixi - {{ history.year }}/{{
            history.month
          }}/{{ history.group_name }}
        </h2>

        <div
          class="relative shadow-md rounded-lg overflow-hidden mb-28"
          :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
        >
          <div v-show="store.allProducts" class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead
                class="text-xs rounded-lg uppercase"
                :class="navbar.userNav ? 'bg-gray-700' : 'bg-gray-50'"
              >
                <tr>
                  <th scope="col" class="text-center py-3">F . I . O</th>
                  <th scope="col" class="text-center py-3">To'lov holati</th>
                  <th scope="col" class="text-center py-3">To'lov</th>
                </tr>
              </thead>
              <tbody v-if="!store.error">
                <tr
                  v-for="i in store.allProducts"
                  :key="i.id"
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-4 font-medium whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="text-center font-medium px-8 py-4">
                    <p
                      :class="{
                        'bg-green-100 text-green-800':
                          i.paymentStatus.includes('to\'langan'),
                        'bg-red-100 text-red-800':
                          i.paymentStatus.includes('to\'lanmagan'),
                        'bg-yellow-100 text-yellow-800':
                          i.paymentStatus.includes('0 so\'m'),
                      }"
                      class="rounded-[5px] p-1"
                    >
                      {{ i.paymentStatus }}
                    </p>
                  </td>

                  <td
                    v-show="store.btn_lamp"
                    class="text-center font-medium px-8 py-4"
                  >
                    <button
                      v-show="store.btn_lamp"
                      @click="toggleModal(i.id, i.full_name)"
                      class="bg-green-600 rounded-lg py-2.5 px-5 text-white"
                    >
                      To'lov qilish
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-show="!store.allProducts"
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>To'lov ro'yhati bo'sh</h1>
            </div>
          </div>

          <div v-show="!store.allProducts" class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead
                class="text-xs rounded-lg uppercase"
                :class="navbar.userNav ? 'bg-gray-700' : 'bg-gray-50'"
              >
                <tr>
                  <th scope="col" class="text-center py-3">
                    O'quvchi (F . I . O)
                  </th>
                  <th scope="col" class="text-center py-3">
                    O'qituvchi (F . I . O)
                  </th>
                  <th scope="col" class="text-center py-3">Guruh</th>
                  <th scope="col" class="text-center py-3">Kurs narxi</th>
                  <th scope="col" class="text-center py-3">To'lov turi</th>
                  <th scope="col" class="text-center py-3">To'lov narxi</th>
                  <th scope="col" class="text-center py-3">Oy</th>
                  <th scope="col" class="text-center py-3">Chek</th>
                  <th scope="col" class="text-center py-3"></th>
                </tr>
              </thead>
              <tbody v-show="!store.error">
                <tr
                  v-for="i in store.PageProduct"
                  :key="i"
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-4 font-medium whitespace-nowrap"
                  >
                    <span>{{ i.student_name }}</span>
                  </th>
                  <td class="text-center font-medium text-red-800 px-8 py-4">
                    <p class="bg-red-100 rounded-[5px] p-1 px-3 whitespace-nowrap">
                      {{ i.teacher_name }}
                    </p>
                  </td>

                  <td class="text-center font-medium text-blue-800 px-8 py-4">
                    <p class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap">
                      {{ i.group_name }}
                    </p>
                  </td>
                  <td class="text-center font-medium text-red-800 px-8 py-4">
                    <p class="bg-red-100 rounded-[5px] p-1 px-3 whitespace-nowrap">
                      {{ i.group_price }} so'm
                    </p>
                  </td>
                  <td class="text-center font-medium text-blue-800 px-8 py-4">
                    <p class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap">
                      {{ i.method }}
                    </p>
                  </td>
                  <td class="text-center font-medium text-green-700 px-8 py-4">
                    <p class="bg-green-100 rounded-[5px] p-1 px-3 whitespace-nowrap">
                      {{ i.price }} so'm
                    </p>
                  </td>
                  <td class="text-center font-medium text-blue-800 px-8 py-4">
                    <p class="bg-blue-100 rounded-[5px] p-1 px-3 whitespace-nowrap">
                      {{ monthNames(i.month) }}
                    </p>
                  </td>
                  <td
                    class="text-center font-medium px-8 py-4 whitespace-nowrap"
                  >
                    <button
                      @click="printChek(i.id)"
                      class="btnAdd rounded-lg py-2.5 px-5 text-white"
                    >
                      Chek chiqarish
                    </button>
                  </td>
                  <td
                    class="text-center whitespace-nowrap font-medium pr-5 py-4"
                  >
                    <i
                      @click="getEditProduct(i.id)"
                      class="bx bxs-pencil bg-blue-300 text-blue-600 rounded-lg p-2 mr-3 cursor-pointer focus:ring-2"
                    >
                    </i>
                    <i
                      @click="deleteFunc(i.id)"
                      class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg p-2 focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              v-show="
                (store.PageProduct && store.error) ||
                store.PageProduct.length == 0
              "
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>To'lov ro'yhati bo'sh</h1>
            </div>
          </div>

          <nav
            v-show="!store.allProducts"
            class="flex flex-row justify-between items-center md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <ul class="inline-flex items-stretch -space-x-px">
              <li
                :class="{
                  'pointer-events-none opacity-50': store.page[0] == 1,
                }"
                @click="
                  store.pagination -= 1;
                  getHistory(store.pagination);
                "
                href="#"
                class="flex font-bold text-black border-2 bg-white hover:bg-gray-300 cursor-pointer items-center justify-center text-sm py-2 sm:mt-0 -mt-2 px-6 rounded-lg leading-tight"
              >
                Oldingi
              </li>
            </ul>
            <span class="text-sm font-normal">
              Sahifa
              <span class="font-semibold"
                ><span>{{ store.page[0] * 15 - 14 }}</span> -
                <span v-if="store.page[0] * 15 < store.page[1]">{{
                  store.page[0] * 15
                }}</span
                ><span v-else>{{ store.page[1] }}</span></span
              >
              dan
              <span class="font-semibold">{{ store.page[1] }}</span>
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              <li
                :class="{
                  'pointer-events-none opacity-50':
                    store.page[0] * 15 >= store.page[1],
                }"
                @click="
                  store.pagination += 1;
                  getHistory(store.pagination);
                "
                href="#"
                class="flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm py-2 sm:mt-0 -mt-2 px-6 cursor-pointer rounded-lg leading-tight"
              >
                Keyingi
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <!-- ----------------------------------------- EMPLYE TABLE END --------------------------------------------- -->
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();

const modal = ref(false);
const hozirgiSana = new Date();
const hozirgiYil = String(hozirgiSana.getFullYear());
const orqaYil = hozirgiSana.getFullYear() - 2;
let hozirgiOy = hozirgiSana.getMonth() + 1;
hozirgiOy = hozirgiOy.toString().padStart(2, "0");
let hozirgiKun = hozirgiSana.getDate();

const store = reactive({
  PageProduct: "",
  page: [],
  pagination: 1,
  allProducts: false,
  error: false,
  guard: "",
  method: "",
  filter: "",
  filter_show: false,
  searchList: [],
  price: 0,
  date: "",
  curentYil: [],
  chekDate: "",
  group_name: "",
  student_name: "",
  teacher_name: "",
  school_logo: "",
  logo_link: "https://dev.edu-devosoft.uz/",
  school_name: "",
  btn_lamp: true,
});

const toggleModal = (id, name) => {
  modal.value = !modal.value;
  form.year = hozirgiYil;
  form.month = hozirgiOy;
  form.method = "";
  form.price = store.price;
  form.id = id;
  store.student_name = name;
  formatDateToNumeric(new Date());
};

const cenecleEdit = () => {
  edit.modal = false;
  cancelFunc();
};

function cancelFunc() {
  form.year = "";
  form.month = "";
  form.method = "";
  form.price = store.price;
  form.id = "";
  modal.value = false;
}

// ----------------------------------- forms -----------------------------------

const form = reactive({
  year: hozirgiYil,
  month: hozirgiOy,
  method: "",
  price: store.price,
  id: "",
  group_id: "",
});

const edit = reactive({
  modal: false,
  id: false,
});

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

const remove = reactive({
  id: "",
  toggle: false,
});

const historyDayModal = () => {
  history.dayModal = true;
  history.monthModal = false;
};

const historyMonthModal = () => {
  history.dayModal = false;
  history.monthModal = true;
};

const historyModal = () => {
  history.modal = !history.modal;
  history.year = hozirgiYil;
  history.month = hozirgiOy;
  history.day = hozirgiKun;
  history.group_id = "";
  historyDayModal();
  getHistory(store.pagination);
};

const history = reactive({
  year: hozirgiYil,
  month: hozirgiOy,
  day: hozirgiKun,
  group_id: "",
  group_name: "",
  modal: false,
  dayModal: true,
  monthModal: false,
});

const monthNames = (month) => {
  switch (month) {
    case "01":
      return "Yanvar";
    case "02":
      return "Fevral";
    case "03":
      return "Mart";
    case "04":
      return "Aprel";
    case "05":
      return "May";
    case "06":
      return "Iyun";
    case "07":
      return "Iyul";
    case "08":
      return "Avgust";
    case "09":
      return "Sentabr";
    case "10":
      return "Oktabr";
    case "11":
      return "Noyabr";
    case "12":
      return "Dekabr";
    default:
      return "Notog'ri oy";
  }
};

// ----------------------------------- axios --------------------------------

const calculatePaymentStatus = (
  paymentHistory,
  groupPrice,
  groupStartDate,
  studentGroup
) => {
  const startDate = new Date(studentGroup[0].createdAt);
  const groupStart = new Date(groupStartDate);
  const currentDate = new Date();

  if (groupStart > currentDate) {
    store.btn_lamp = false;
    return "Guruh hali boshlanmagan";
  }
  store.btn_lamp = true;

  const monthsDiff =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    currentDate.getMonth() -
    startDate.getMonth() +
    1;

  if (!paymentHistory || paymentHistory.length === 0) {
    return `(${groupPrice * monthsDiff}) so'm to'lanmagan`;
  }

  const paymentsByMonth = {};
  paymentHistory.forEach((payment) => {
    const paymentDate = new Date(payment.year, payment.month - 1);
    const key = `${paymentDate.getFullYear()}-${paymentDate.getMonth() + 1}`;

    if (!paymentsByMonth[key]) {
      paymentsByMonth[key] = 0;
    }
    paymentsByMonth[key] += payment.price;
  });

  let totalPaid = 0;
  let totalDue = 0;

  for (let i = 0; i < monthsDiff; i++) {
    const monthDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i
    );

    const key = `${monthDate.getFullYear()}-${monthDate.getMonth() + 1}`;

    const monthDue = Number(groupPrice);
    const monthPaid = paymentsByMonth[key] || 0;

    totalDue += monthDue;
    totalPaid += monthPaid;
  }

  const monthsPaid = Object.keys(paymentsByMonth).length;

  const averagePayment = (groupPrice * monthsDiff) / monthsPaid;

  const expectedPayment = averagePayment * monthsPaid;
  const amountDue = totalDue - totalPaid;

  if (amountDue < 0) {
    return `(${Math.abs(amountDue)}) so'm ortiqcha to'langan`;
  } else if (amountDue === 0) {
    return "(0 so'm) hammasi to'langan";
  } else {
    return `(${amountDue}) so'm to'lanmagan`;
  }
};

const getOneProduct = async (id) => {
  try {
    const schoolId = localStorage.getItem("school_id");
    const token = localStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${token}` } };

    const groupResponse = await axios.get(`/group/${schoolId}/${id}`, headers);
    const {
      price: groupPrice,
      start_date: groupStartDate,
      name: groupName,
      school,
    } = groupResponse.data;

    store.price = Number(groupPrice);
    store.date = groupStartDate;
    store.group_name = groupName;
    form.group_id = id;
    store.school_name = school.name;
    store.school_logo = school.image;

    const employeeResponse = await axios.get(
      `/employee/${schoolId}/${groupResponse.data.employee[0].employee_id}`,
      headers
    );
    store.teacher_name = employeeResponse.data.full_name;

    if (!groupStartDate || isNaN(Date.parse(groupStartDate))) {
      throw new Error("Guruh ochilgan sana noto'g'ri");
    }

    const studentPromises = groupResponse.data.student.map(async (student) => {
      const studentInfo = await axios.get(
        `/student/${schoolId}/${student.student_id}`,
        headers
      );
      const payments = studentInfo.data.payment;
      const paymentsForGroup = payments.filter(
        (payment) => payment.group_id === form.group_id
      );

      studentInfo.data.paymentStatus = calculatePaymentStatus(
        paymentsForGroup,
        groupPrice,
        groupStartDate,
        studentInfo.data.group
      );
      return studentInfo.data;
    });

    store.allProducts = await Promise.all(studentPromises);
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const getGroup = () => {
  axios
    .get(`/group/${localStorage.getItem("school_id")}/find`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.group = res.data;
    })
    .catch((error) => {
      store.group = [{ name: "Guruh yaratilmagan" }];
    });
};

const checkPayment = (year, month, groupStartDate) => {
  const paymentYear = parseInt(year, 10);
  const paymentMonth = parseInt(month, 10);

  const groupStart = new Date(groupStartDate);
  const groupStartYear = groupStart.getFullYear();
  const groupStartMonth = groupStart.getMonth() + 1;

  if (
    paymentYear < groupStartYear ||
    (paymentYear === groupStartYear && paymentMonth < groupStartMonth)
  ) {
    return false;
  } else {
    return true;
  }
};

const checkOldPayment = async (
  school_id,
  student_id,
  group_id,
  year,
  month
) => {
  try {
    const res = await axios.get(`/payment/${school_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const payments = res.data;
    const hasOldPayment = payments.some(
      (payment) =>
        payment.student_id === student_id &&
        payment.group_id === group_id &&
        payment.year === year &&
        payment.month === month
    );
    return !hasOldPayment;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const addPayment = async () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    student_id: form.id,
    group_id: Number(form.group_id),
    year: form.year,
    month: form.month,
    method: form.method,
    discount: 0,
    price: form.price,
  };

  const check = checkPayment(form.year, form.month, store.date);

  const checkOldPay = await checkOldPayment(
    Number(localStorage.getItem("school_id")),
    form.id,
    Number(form.group_id),
    form.year,
    form.month
  );

  if (!check) {
    notification.warning("To'lov qilmoqchi bo'lgan sanada guruh boshlanmagan");
    return;
  }

  if (!checkOldPay) {
    notification.warning(
      "To'lov qilmoqchi bo'lgan sanaga oldin to'lov qilingan"
    );
    return;
  }

  try {
    const res = await axios.post("/payment", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    printReceipt();
    cancelFunc();
    notification.success("To'lov qilindi!");
    getOneProduct(form.group_id);
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const getHistory = (page) => {
  store.allProducts = false;
  const schoolId = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url;
  if (history.dayModal) {
    url = `/payment/day/${schoolId}/${history.year}/${history.month}/${history.day}/page?page=${page}`;
  } else if (history.monthModal) {
    url = `/payment/month/${schoolId}/${history.group_id}/${history.year}/${history.month}/page?page=${page}`;
  } else {
    return;
  }

  axios
    .get(url, config)
    .then((res) => {
      const records = res.data?.data?.records;
      history.group_name = records[0].group_name;
      store.PageProduct = records.sort((a, b) => b.id - a.id);
      const pagination = res.data?.data?.pagination;
      store.page = [pagination.currentPage, pagination.total_count];
      store.error = false;
      history.modal = false;
    })
    .catch((error) => {
      store.PageProduct = error.response?.data?.message;
      store.error = true;
    });
};

const getMethod = () => {
  axios
    .get(`/payment-method/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.method = res.data;
    })
    .catch((error) => {
      store.method = [{ name: "To'lov turi yaratilmagan" }];
    });
};

const getEditProduct = (id) => {
  axios
    .get(`/payment/${localStorage.getItem("school_id")}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      edit.id = id;
      form.year = res.data.year;
      form.month = res.data.month;
      form.price = res.data.price;
      form.method = res.data.method;
      form.id = res.data.student.id;
      form.group_id = res.data.group.id;
      formatDateToNumeric(new Date(res.data.createdAt));
      store.school_logo = res.data.school.image;
      store.school_name = res.data.school.name;
      store.student_name = res.data.student.full_name;
      store.group_name = res.data.group.name;
      store.price = res.data.group.price;
      const teacher = store.PageProduct.find((teacher) => teacher.id === id);
      store.teacher_name = teacher.teacher_name;
      edit.modal = true;
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

const editProduct = () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    student_id: form.id,
    group_id: Number(form.group_id),
    year: form.year,
    month: form.month,
    method: form.method,
    discount: 0,
    price: form.price,
  };

  const check = checkPayment(form.year, form.month, store.date);

  if (!check) {
    notification.warning("To'lov qilmoqchi bo'lgan sanada guruh boshlanmagan");
  } else {
    axios
      .put(`/payment/${localStorage.getItem("school_id")}/${edit.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        printReceipt();
        cancelFunc();
        cenecleEdit();
        notification.success("To'lov tahrirlandi!");
        getProduct(store.pagination);
      })
      .catch((error) => {
        notification.warning(
          "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
        );
      });
  }
};

const deleteProduct = () => {
  axios
    .delete(`/payment/${localStorage.getItem("school_id")}/${remove.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success("To'lov o'chirildi");
      getProduct(store.pagination);
      remove.toggle = false;
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

const formatDateToNumeric = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  store.chekDate = `${year}-${month}-${day}, ${hour}:${minute}`;
};

const printReceipt = () => {
  const printWindow = window.open("", "_blank");

  printWindow.document.write(`
    <html>
      <head>
        <title>Chek</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-100">
        <div class="max-w-md mx-auto bg-white rounded-lg pr-5 mb-10">
          <div class="mb-10 mt-5 flex items-center justify-center gap-1">
            <img class="w-8 rounded-full" src="${store.logo_link}${
    store.school_logo
  }" alt="">
            <h2 class="text-xl font-bold uppercase">${store.school_name}</h2>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">To'lov turi:</span>
            <span style="font-size: 12px;" id="paymentType">${
              form.method
            }</span>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">Talaba:</span>
            <span style="font-size: 12px;" id="studentName">${
              store.student_name
            }</span>
          </div>
          <div class="item flex justify-between gap-10 border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">Guruh nomi:</span>
            <span style="font-size: 12px; text-align:end;" id="group">${
              store.group_name
            }</span>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">Kurs narxi:</span>
            <span style="font-size: 12px;" id="coursePrice">${
              store.price
            } so'm</span>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">Ustoz:</span>
            <span style="font-size: 12px;" id="teacher">${
              store.teacher_name
            }</span>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">Oy:</span>
            <span style="font-size: 12px;" id="date" class="font-bold text-lg">${monthNames(
              form.month
            )}</span>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">To'lov:</span>
            <span style="font-size: 12px;" id="amount" class="font-bold text-lg">${
              form.price
            } so'm</span>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">Sana:</span>
            <span style="font-size: 12px;" id="date">${store.chekDate}</span>
          </div>
          <div class="item flex justify-center text-center border-b border-dashed border-black py-2">
            <span style="font-size: 12px;">IT ni it deb o'qima, <br> Ingliz tili va AyTi ni <span class="font-bold uppercase">${
              store.school_name
            }</span> da o'rgan!</span>
          </div>
          <div style="font-size: 8px;" class="flex items-center justify-end gap-1 mt-10 mb-20">
            <span class="brand_box">
              <h5>Devosoft Group</h5>
              <span style="font-size: 7px; font-weight: 600;" class:"phone_number">+998933279137</span>
            </span>
          </div>
        </div>
        <style>
        .brand_box {
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:flex-end;

        }
          .brand_box h5 {
            font-size:10px;
            margin:0;
            line:height:4px;
            font-weight: 600;
          }
            .phone_number {
            text-align:end;
            }
        </style>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();

  printWindow.onafterprint = () => {
    printWindow.close();
  };
};

const printChek = (id) => {
  const product = store.PageProduct.find((product) => product.id === id);
  formatDateToNumeric(new Date(product.createdAt));
  axios
    .get(`/school/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const printWindow = window.open("", "_blank");

      printWindow.document.write(`
    <html>
      <head>
        <title>Chek</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-100">
        <div class="max-w-md mx-auto bg-white rounded-lg pr-5 mb-10">
          <div class="mb-10 mt-5 flex items-center justify-center gap-1">
            <img class="w-8 rounded-full" src="${store.logo_link}${
        res.data.image
      }" alt="">
            <h2 class="text-xl font-bold uppercase">${res.data.name}</h2>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">To'lov turi:</span>
            <span style="font-size: 12px;" id="paymentType">${
              product.method
            }</span>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">Talaba:</span>
            <span style="font-size: 12px;" id="studentName">${
              product.student_name
            }</span>
          </div>
          <div class="item flex justify-between gap-10 border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">Guruh nomi:</span>
            <span style="font-size: 12px; text-align:end;" id="group">${
              product.group_name
            }</span>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">Kurs narxi:</span>
            <span style="font-size: 12px;" id="coursePrice">${
              product.group_price
            } so'm</span>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">Ustoz:</span>
            <span style="font-size: 12px;" id="teacher">${
              product.teacher_name
            }</span>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">Oy:</span>
            <span style="font-size: 12px;" id="date" class="font-bold text-lg">${monthNames(
              product.month
            )}</span>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">To'lov:</span>
            <span style="font-size: 12px;" id="amount" class="font-bold text-lg">${
              product.price
            } so'm</span>
          </div>
          <div class="item flex justify-between border-b border-dashed border-black py-2">
            <span style="font-size: 12px;" class="font-semibold">Sana:</span>
            <span style="font-size: 12px;" id="date">${store.chekDate}</span>
          </div>
          <div class="item flex justify-center text-center border-b border-dashed border-black py-2">
            <span style="font-size: 12px;">IT ni it deb o'qima, <br> Ingliz tili va AyTi ni <span class="font-bold uppercase">${
              res.data.name
            }</span> da o'rgan!</span>
          </div>
          <div style="font-size: 8px;" class="flex items-center justify-end gap-1 mt-10 mb-20">
            <span class="brand_box">
              <h5>Devosoft Group</h5>
              <span style="font-size: 7px; font-weight: 600;" class:"phone_number">+998933279137</span>
            </span>
          </div>
        </div>
        <style>
        .brand_box {
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:flex-end;

        }
          .brand_box h5 {
            font-size:10px;
            margin:0;
            line:height:4px;
            font-weight: 600;
          }
            .phone_number {
            text-align:end;
            }
        </style>
      </body>
    </html>
  `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();

      printWindow.onafterprint = () => {
        printWindow.close();
      };
    })
    .catch((error) => {
      notification.warning(
        "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
      );
    });
};

onMounted(() => {
  getHistory(store.pagination);
  getGroup();
  getMethod();
  for (let i = 0; i < 5; i++) {
    let list = {
      id: i,
      name: String(orqaYil + i),
    };
    store.curentYil.push(list);
  }
});
</script>

<style lang="scss" scoped>
.btnAdd {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnKirish {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnOrqaga {
  background-image: linear-gradient(to right, white -450%, #2f73f0);
}

.darkForm {
  label {
    color: white;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 1s ease;
}
.modal-fade-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}
.modal-fade-leave-from {
  opacity: 0;
  transform: translateY(50px);
}
</style>
