﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using QuizAPI.DataAccess;

#nullable disable

namespace QuizAPI.Migrations
{
    [DbContext(typeof(DbDataContext))]
    [Migration("20231201011923_Create DB & Models")]
    partial class CreateDBModels
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("QuizAPI.Models.Participant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.Property<int>("TimeTaken")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Participants");
                });

            modelBuilder.Entity("QuizAPI.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Answer")
                        .HasColumnType("int");

                    b.Property<string>("ImageName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Option1")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Option2")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Option3")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Option4")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("QnInWods")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("Id");

                    b.ToTable("Questions");
                });
#pragma warning restore 612, 618
        }
    }
}
