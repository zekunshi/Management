<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.bookName" placeholder="书名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getBooks">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="books" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>

			<el-table-column prop="bookName" label="书名" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="bookType" label="类别" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="bookNum" label="数量" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">


				<el-form-item label="书名">
					<el-input v-model="editForm.bookName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="数量">
					<el-input-number v-model="editForm.bookNum" :min="0" ></el-input-number>
				</el-form-item>
				<el-form-item label="类别">
					<el-input type="textarea" v-model="editForm.bookType"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">

				<el-form-item label="书名">
					<el-input v-model="addForm.bookName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="数量">
					<el-input-number v-model="addForm.bookNum" :min="0" ></el-input-number>
				</el-form-item>
				<el-form-item label="类别">
					<el-input type="textarea" v-model="addForm.bookType"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getBooksListPage, removeBooks, batchRemoveBooks, editBooks, addBooks } from '../../api/api';


	export default {
		data() {
			return {
				filters: {
					bookName: ''
				},
				books: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					bookName: [
						{ required: true, message: '请输入书名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,

					bookNum: 0,
					bookName: '',
					bookType: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					bookName: [
						{ required: true, message: '请输入书名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					id: 0,
					bookNum: 0,
					bookName: '',
					bookType: ''

				}

			}
		},
		methods: {

			handleCurrentChange(val) {
				this.page = val;
				this.getBooks();
			},
			//获取用户列表
			getBooks() {
				let para = {
					page: this.page,
					bookName: this.filters.bookName
				};
				console.log(para)
				this.listLoading = true;
				//NProgress.start();
				getBooksListPage(para).then((res) => {

					this.total = res.data.total;
					this.books = res.data.books;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeBooks(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getBooks();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {

					bookNum: 0,
					bookName: '',
					bookType: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							console.log(this.editForm)

							editBooks(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getBooks();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);

							addBooks(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getBooks();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveBooks(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getBooks();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getBooks();
		}
	}

</script>

<style scoped>

</style>
