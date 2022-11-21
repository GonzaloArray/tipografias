(function () {
    const INDEX_URL = 'https://lighthouse-user-api.herokuapp.com/api/v1/users/'
    const user = document.getElementById('user')
    const dataMode = document.getElementById('data-mode')
    const mode = document.getElementById('mode')
    const data = []

    const searchForm = document.getElementById('search')
    const searchInput = document.getElementById('searchBar')

    const list = JSON.parse(localStorage.getItem('favoriteUsers')) || []

    const pagination = document.getElementById('pagination')
    const ITEM_PER_PAGE = 16
    let paginationData = []

    let dataModeInitial = 'modeHome'
    let modeInitial = 'cards'
    let pageInitial = 1

    //抓取api
    axios.get(INDEX_URL)
        .then(response => {
            data.push(...response.data.results)
            // showUserPanel(data)
            getTotalPages(data)
            getPageData(1, data)
        })
        .catch(err => {
            console.log(err)
        })

    //點擊大頭貼與存入喜愛名單事件監聽器
    user.addEventListener('click', event => {
        if (event.target.matches('.btn-show')) {
            modalShowDital(event.target.dataset.id)
        } else if (event.target.matches('.btn-add-favorite')) {
            addFavoriteUser(event.target.dataset.id)
        } else if (event.target.matches('.btn-remove-favorite')) {
            removeFavoriteUser(event.target.dataset.id)
        }
    })

    //搜尋事件監聽器
    searchForm.addEventListener('submit', event => {
        event.preventDefault()
        let input = searchInput.value.toLowerCase()
        let results = []
        if (dataModeInitial === 'modeHome') {
            results.push(...data.filter(
                user => user.name.toLowerCase().includes(input)))
            results.push(...data.filter(
                user => user.surname.toLowerCase().includes(input)))
        } else if (dataModeInitial === 'modeFavorite') {
            results.push(...list.filter(
                user => user.name.toLowerCase().includes(input)))
            results.push(...list.filter(
                user => user.surname.toLowerCase().includes(input)))
        }
        results = results.filter(function (user, index, arr) {
            console.log(user)
            console.log(index)
            console.log(arr)
            return arr.indexOf(user) === index;

        })
        getPageData(1, results)
        getTotalPages(results)
    })

    //Pagination 標籤的事件監聽器
    pagination.addEventListener('click', event => {
        if (event.target.tagName === 'A') {
            pageInitial = event.target.dataset.page
            getPageData(event.target.dataset.page)
        }
    })

    //data mode
    dataMode.addEventListener('click', event => {
        let results = []
        pageInitial = 1
        if (event.target.id === 'mode-home' || event.target.id === 'mode-gender') {
            dataModeInitial = 'modeHome'
            results = data
        } else if (event.target.id === 'mode-favorite') {
            dataModeInitial = 'modeFavorite'
            results = list
        } else if (event.target.id === 'mode-male') {
            dataModeInitial = 'modeMale'
            results.push(...data.filter(user => user.gender === 'male'))
        } else if (event.target.id === 'mode-female') {
            dataModeInitial = 'modeFemale'
            results.push(...data.filter(user => user.gender === 'female'))
        }
        getPageData(1, results)
        getTotalPages(results)
    })

    //mode
    mode.addEventListener('click', event => {
        if (event.target.id === 'mode-cards') {
            modeInitial = 'cards'
            getPageData(pageInitial)
        } else if (event.target.id === 'mode-list')
            modeInitial = 'list'
        getPageData(pageInitial)
    })

    //取出特定頁面資料
    function getPageData(pageNum, data) {
        paginationData = data || paginationData
        let offset = (pageNum - 1) * ITEM_PER_PAGE
        let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)

        modeDisplay(pageData)
        favoriteIconONOFF(pageData)
    }

    //顯示User Model
    function modalShowDital(id) {
        const url = INDEX_URL + id
        const modalShow = document.getElementById('modal-content')
        modalShow.innerHTML = ''
        axios.get(url)
            .then(response => {
                const user = response.data
                modalShow.innerHTML = `
            <div class="modal-header">
              <h5 id="user-name" class="modal-title" id="exampleModalLabel">
              ${user.name} ${user.surname}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div id="user-pic" class="row justify-content-center">
                  <img class="show square" src="${user.avatar}">
                </div>
                <div id="user-dital" class="row justify-content-center">
                  <ul class="model-ul">
                    <li><i class="fa fa-transgender icon"></i>${user.gender}</li>
                    <li><i class="fa fa-user icon"></i>${user.age} years old</li>
                    <li><i class="fa fa-birthday-cake icon"></i>${user.birthday}</li>
                    <li><i class="fa fa-comment icon"></i>${user.email}</li>
                    <li><i class="fa fa-map-marker icon"  style="margin-left: 4px;"></i>${user.region}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
            </div>
          `
            })
            .catch(err => {
                console.log(err)
            })
    }

    //存入喜愛名單並判斷使否已經存在名單內，已存在則直接移除
    function addFavoriteUser(id) {
        const user = data.find(item => item.id === Number(id))
        const index = list.findIndex(item => item.id === Number(id))
        console.log(index)

        if (list.some(item => item.id === Number(id))) {
            if (index === -1) return

            list.splice(index, 1)
            event.target.classList.remove('fa-heart')
            console.log(event.target)
            event.target.classList.add('fa-heart-o')
        } else {
            list.push(user)
            console.log(event.target)
            event.target.classList.remove('fa-heart-o')
            event.target.classList.add('fa-heart')
        }
        localStorage.setItem('favoriteUsers', JSON.stringify(list))
    }

    //移除喜愛名單
    function removeFavoriteUser(id) {
        const index = list.findIndex(item => item.id === Number(id))
        if (index === -1) return

        list.splice(index, 1)
        localStorage.setItem('favoriteUsers', JSON.stringify(list))

        getPageData(1, list)
    }

    //計算總頁數並演算 li.page-item
    function getTotalPages(data) {
        let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
        let pageItemContent = ''
        for (let i = 0; i < totalPages; i++) {
            pageItemContent += `
          <li class="page-item">
            <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
          </li>
        `
        }
        pagination.innerHTML = pageItemContent
    }

    //fa-heart on or off
    function favoriteIconONOFF(data) {
        const favoriteIcon = document.querySelectorAll('.heart')
        favoriteIcon.forEach(item => {
            if (list.some(user => user.id === Number(item.dataset.id))) {
                item.classList.remove('fa-heart-o')
                item.classList.add('fa-heart')
            }
        })
    }

    function modeDisplay(data) {
        if (data.length === 0) {
            console.log('MMMMM')
            let htmlContent = ''
            htmlContent += `
          <p style="color: #1dd7a7; font-size: 60px;">No one is here:)</p>
        `
            user.innerHTML = htmlContent
        } else if (modeInitial === 'cards') {
            let htmlContent = ''

            data.forEach(user => {
                htmlContent += `
                <div class="col-auto">
                  <div class="card hvr-border-fade" style="width: 15rem;">
                    <a data-id="${user.id}" class="fa heart btn-add-favorite fa-heart-o"></a>
                    <img data-id="${user.id}" class="card-img-top panel square hvr-grow btn-show" src="${user.avatar}" data-toggle="modal" data-target="#userModal" alt="Card image cap">
                    <div class="card-inner">
                      <h5 class="card-title">${user.name}</h5>
                      <h5 class="card-title">${user.surname}<i class="fa fa-${user.gender}" style="float:right;"></i></h5>
                    </div>
                  </div>
                </div>
              `
            })
            user.innerHTML = htmlContent
        } else if (modeInitial === 'list') {
            let htmlContent = ''

            data.forEach(user => {
                htmlContent += `
                <div class="col-12 col-sm-6">
                  <div class="list d-flex">
                    <img data-id="${user.id}" class="card-img-top list-pic square hvr-grow btn-show" src="${user.avatar}" data-toggle="modal" data-target="#userModal" alt="Card image cap">
                    <h5 class="mr-auto list-title">${user.name} ${user.surname}<i class="ml-2 fa fa-${user.gender}"></i></h5>
                      <a data-id="${user.id}" class="fa heart btn-add-favorite fa-heart-o"></a>
                  </div>
                </div>
              `
            })
            user.innerHTML = htmlContent
        }
    }

})()
